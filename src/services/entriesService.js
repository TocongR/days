import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase/config'

const ENTRIES_COLLECTION = 'entries'

/**
 * Creates a new, blank entry and returns its id.
 * createdAt and updatedAt are set automatically.
 */
export async function createEntry() {
  const ref = await addDoc(collection(db, ENTRIES_COLLECTION), {
    content: '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

/**
 * Updates the content of an entry and refreshes updatedAt.
 */
export async function updateEntry(id, content) {
  const ref = doc(db, ENTRIES_COLLECTION, id)
  await updateDoc(ref, {
    content,
    updatedAt: serverTimestamp(),
  })
}

/**
 * Deletes an entry entirely.
 */
export async function deleteEntry(id) {
  const ref = doc(db, ENTRIES_COLLECTION, id)
  await deleteDoc(ref)
}

/**
 * Fetches a single entry by id.
 */
export async function getEntry(id) {
  const ref = doc(db, ENTRIES_COLLECTION, id)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

/**
 * Fetches all entries, newest first (by updatedAt).
 */
export async function getAllEntries() {
  const q = query(collection(db, ENTRIES_COLLECTION), orderBy('updatedAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/**
 * Fetches all entries ordered chronologically by createdAt, newest first.
 * Used by the Timeline page.
 */
export async function getEntriesChronological() {
  const q = query(collection(db, ENTRIES_COLLECTION), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
