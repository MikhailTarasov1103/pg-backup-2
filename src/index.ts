import { checkTimeForBackup } from './services/checkTimeForBackup'
import { getBackupFiles, makeBackup, removeBackupFile } from './services/backup'
import { uploadToCloudStorage } from './services/cloudStorage'
import { validateLastCloudStorageBackup } from './services/validationBackup';
import { validateInitialParams } from './services/initialParams'

const CHECK_PERIOD_MS = 1000 * 60
const BACKUP_FILES_COUNT_MAX = 10

export const BACKUP_PATH = process.cwd() + '/backups'
export const TEMP_PATH = process.cwd() + '/temp'

const processBackup = async () => {
  try {
    const isTimeToBackup = checkTimeForBackup()
    if (!isTimeToBackup) {
      return
    }

    const backupFiles = await getBackupFiles()
    if (backupFiles.length >= BACKUP_FILES_COUNT_MAX) {
      const oldestBackupFile = backupFiles.sort((a, b) => parseInt(a) - parseInt(b))[0]
      if (oldestBackupFile) {
        await removeBackupFile(`${BACKUP_PATH}/${oldestBackupFile}`)
      }
    }

    const newestBackupFile = await makeBackup()
    await uploadToCloudStorage(newestBackupFile)

    await validateLastCloudStorageBackup()
  } catch (e) {
    console.error(e)
  }
}

const main = async () => {
  try {
    validateInitialParams()
    setInterval(processBackup, CHECK_PERIOD_MS)
    console.log('PG-BACKUP is running now!')
  } catch (e) {
    console.log('Application run error!')
    console.log('Error: ', e)
  }
}

main()
