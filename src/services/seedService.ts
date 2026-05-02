import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "../lib/firebase";
import { SAMPLE_RESTAURANTS, SAMPLE_MENU_ITEMS } from "../constants/initialData";

export async function seedDatabase() {
  const batch = writeBatch(db);

  SAMPLE_RESTAURANTS.forEach((rest) => {
    const restRef = doc(db, "restaurants", rest.id);
    batch.set(restRef, rest);

    const items = SAMPLE_MENU_ITEMS[rest.id as keyof typeof SAMPLE_MENU_ITEMS] || [];
    items.forEach((item) => {
      const itemRef = doc(collection(db, "restaurants", rest.id, "menu"), item.id);
      batch.set(itemRef, item);
    });
  });

  await batch.commit();
  console.log("Database seeded successfully");
}
