import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { GuestProfile } from '../types';
import { getGuestProfile, saveGuestProfile } from '../services/dataService';

interface AuthContextType {
  user: User | null;
  profile: GuestProfile | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<GuestProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<GuestProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const p = await getGuestProfile(u.uid);
        if (p) {
          setProfile(p as GuestProfile);
        } else {
          const newProfile: GuestProfile = {
            id: u.uid,
            name: u.displayName || 'Guest',
            roomNumber: '',
            email: u.email || '',
            points: 0,
            checkedIn: true
          };
          await saveGuestProfile(newProfile);
          setProfile(newProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = () => signOut(auth);

  const updateProfile = async (data: Partial<GuestProfile>) => {
    if (!user || !profile) return;
    const updated = { ...profile, ...data };
    await saveGuestProfile(updated);
    setProfile(updated);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
