import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs,
  getDoc,
  setDoc,
  Timestamp,
  orderBy
} from "firebase/firestore";
import { db, auth } from "../lib/firebase";

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// RESTAURANTS
export function subscribeToRestaurants(callback: (restaurants: any[]) => void) {
  const q = query(collection(db, "restaurants"), orderBy("isFeatured", "desc"));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  }, (error) => handleFirestoreError(error, OperationType.LIST, "restaurants"));
}

export function subscribeToMenu(restaurantId: string, callback: (items: any[]) => void) {
  const q = collection(db, "restaurants", restaurantId, "menu");
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  }, (error) => handleFirestoreError(error, OperationType.LIST, `restaurants/${restaurantId}/menu`));
}

// ORDERS
export async function placeOrder(orderData: any) {
  const path = "orders";
  try {
    const docRef = await addDoc(collection(db, path), {
      ...orderData,
      status: 'pending',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export function subscribeToGuestOrders(guestId: string, callback: (orders: any[]) => void) {
  const q = query(
    collection(db, "orders"), 
    where("guestId", "==", guestId),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      createdAt: (doc.data().createdAt as Timestamp).toDate(),
      updatedAt: (doc.data().updatedAt as Timestamp).toDate()
    }));
    callback(data);
  }, (error) => handleFirestoreError(error, OperationType.LIST, "orders"));
}

export function subscribeToAllOrders(callback: (orders: any[]) => void) {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      createdAt: (doc.data().createdAt as Timestamp).toDate(),
      updatedAt: (doc.data().updatedAt as Timestamp).toDate()
    }));
    callback(data);
  }, (error) => handleFirestoreError(error, OperationType.LIST, "orders"));
}

export async function updateOrderStatus(orderId: string, status: string) {
  const path = `orders/${orderId}`;
  try {
    await updateDoc(doc(db, "orders", orderId), {
      status,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

// GUEST PROFILE
export async function getGuestProfile(guestId: string) {
  const path = `guests/${guestId}`;
  try {
    const snap = await getDoc(doc(db, "guests", guestId));
    return snap.exists() ? snap.data() : null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function saveGuestProfile(profile: any) {
  const path = `guests/${profile.id}`;
  try {
    await setDoc(doc(db, "guests", profile.id), profile, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
