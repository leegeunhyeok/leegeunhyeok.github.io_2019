const DB_VERSION = 1

const dataStore = () => {
  function openDatabase () {
    return new Promise((resolve, reject) => {
      if (!self.indexedDB) {
        reject(new Error('IndexedDB를 지원하지 않는 브라우저입니다.'))
        return
      }

      const request = self.indexedDB.open('ghlee-portfolio', DB_VERSION)

      request.onerror = reject
      request.onupgradeneeded = (event) => {
        const db = event.target.result

        // 기존 데이터베이스 버전이 1보다 작은 경우 (데이터베이스 처음 사용시 버전 0)
        if (event.oldVersion < 1) {
          const projectStore = db.createObjectStore('project', {
            keyPath: 'id'
          })

          const activityStore = db.createObjectStore('activity', {
            keyPath: 'id'
          })

          projectStore.createIndex('project_id', 'id', { unique: true })
          activityStore.createIndex('activity_id', 'id', { unique: true })
        }
      }

      // 데이터베이스 열기 성공
      request.onsuccess = () => {
        resolve(request.result)
      }
    })
  }

  function saveProject (project) {
    return new Promise((resolve, reject) => {
      openDatabase().then(db => {
        const transaction = db.transaction('project', 'readwrite')
        const projectObjectStore = transaction.objectStore('project')
        projectObjectStore.put(project)

        transaction.oncomplete = () => {
          resolve()
        }

        transaction.onerror = (e) => {
          reject(e)
        }
      }).catch(e => {
        reject(e)
      })
    })
  }

  function getProjects () {
    return new Promise((resolve, reject) => {
      openDatabase().then(db => {
        const projects = []
        const cursor = db.transaction('project', 'readonly')
          .objectStore('project')
          .openCursor(null, 'prev')

        cursor.onsuccess = (event) => {
          const cursor = event.target.result
          if (cursor) {
            projects.push(cursor.value)
            cursor.continue()
          } else {
            resolve(projects)
          }
        }

        cursor.onerror = (e) => {
          reject(e)
        }
      }).catch(e => {
        reject(e)
      })
    })
  }

  function saveActivity (activity) {
    return new Promise((resolve, reject) => {
      openDatabase().then(db => {
        const transaction = db.transaction('activity', 'readwrite')
        const activityObjectStore = transaction.objectStore('activity')
        activityObjectStore.put(activity)

        transaction.oncomplete = () => {
          resolve()
        }

        transaction.onerror = (e) => {
          reject(e)
        }
      }).catch(e => {
        reject(e)
      })
    })
  }

  function getActivities () {
    return new Promise((resolve, reject) => {
      openDatabase().then(db => {
        const activities = []
        const cursor = db.transaction('project', 'readonly')
          .objectStore('project')
          .openCursor(null, 'prev')

        cursor.onsuccess = (event) => {
          const cursor = event.target.result
          if (cursor) {
            activities.push(cursor.value)
            cursor.continue()
          } else {
            resolve(activities)
          }
        }

        cursor.onerror = (e) => {
          reject(e)
        }
      }).catch(e => {
        reject(e)
      })
    })
  }

  return {
    openDatabase,
    saveProject,
    getProjects,
    saveActivity,
    getActivities
  }
}

export default dataStore
