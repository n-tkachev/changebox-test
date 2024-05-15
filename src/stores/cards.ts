// store.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CardData } from '@/interfaces/interfaces'

export const useCardsStore = defineStore('cards', () => {
  
  const db = ref<IDBDatabase | null>(null)
  const cards = ref<CardData[]>([])

  const openDB = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('myDatabase', 1)

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBRequest<IDBDatabase>).result;
        db.createObjectStore('cards', { keyPath: 'id', autoIncrement: true })
      }

      request.onsuccess = () => {
        db.value = request.result
        resolve(request.result)
      }

      request.onerror = () => {
        reject(request.error)
      }
    })
  }

  const saveCard = async (card: CardData) => {
    if (!db.value) {
      db.value = await openDB()
    }

    const tx = db.value.transaction('cards', 'readwrite')
    const store = tx.objectStore('cards')
    const request = store.add(card)

    return new Promise<void>((resolve, reject) => {
      request.onsuccess = () => {
        resolve()
      }

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  const getAllCards = (): Promise<CardData[]> => {
    if (!db.value) {
      throw new Error('Database is not opened');
    }

    const tx = db.value.transaction('cards', 'readonly');
    const store = tx.objectStore('cards');
    const request = store.getAll();

    return new Promise<CardData[]>((resolve, reject) => {
      request.onsuccess = () => {
        const result = request.result as CardData[]
        cards.value = result
        resolve(result)
      }

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  const deleteCard = (id: number): Promise<void> => {
    debugger

    if (!db.value) {
      throw new Error('Database is not opened')
    }

    const tx = db.value.transaction('cards', 'readwrite')
    const store = tx.objectStore('cards')
    const request = store.delete(id)

    return new Promise<void>((resolve, reject) => {
      request.onsuccess = () => {
        resolve()
      }

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  const getCardById = (id: number): Promise<CardData | null> => {
    if (!db.value) {
      throw new Error('Database is not opened')
    }
  
    const tx = db.value.transaction('cards', 'readonly')
    const store = tx.objectStore('cards')
    const request = store.get(id)
  
    return new Promise<CardData | null>((resolve, reject) => {
      request.onsuccess = () => {
        const result = request.result as CardData | null
        resolve(result);
      };
  
      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  const updateCardById = (id: number, updatedData: Partial<CardData>): Promise<void> => {
    if (!db.value) {
      throw new Error('Database is not opened')
    }
  
    const tx = db.value.transaction('cards', 'readwrite')
    const store = tx.objectStore('cards');
    const request = store.get(id)
  
    return new Promise<void>((resolve, reject) => {
      request.onsuccess = () => {
        const card = request.result as CardData
        if (!card) {
          reject(new Error('Card not found'))
          return
        }
        const updatedCard = { ...card, ...updatedData }
        const updateRequest = store.put(updatedCard)
        updateRequest.onsuccess = () => {
          // Mutate edited card in store instead of fetching all data again since we are sure that transaction is completed in db
          const index = cards.value.findIndex(card => card.id === id);
            if (index !== -1) {
              cards.value[index] = updatedCard;
            }
          resolve()
        }
        updateRequest.onerror = (event) => {
          reject((event.target as IDBRequest).error)
        }
      }
  
      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  return { db, cards, openDB, saveCard, getAllCards, deleteCard, getCardById, updateCardById }
})
