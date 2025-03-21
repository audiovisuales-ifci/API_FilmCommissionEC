import { Router } from 'express'
import verifyToken from '../middlewares/verifyToken'
import companyController from '../controllers/companyController'
import uploadTempFiles from '../middlewares/multer'

const companyRouter = Router()

companyRouter.get('/user', verifyToken, companyController.getUserCompanies)
companyRouter.get('/', companyController.getCompanies)
companyRouter.post('/', verifyToken, companyController.postCompany)
companyRouter.get('/:id', companyController.getCompany)
companyRouter.put(
  '/files/delete',
  verifyToken,
  companyController.deleteCompanyFile,
)
companyRouter.put(
  '/files',
  verifyToken,
  uploadTempFiles.any(),
  companyController.updateCompanyFiles,
)
companyRouter.put('/edit', verifyToken, companyController.updateCompany)
companyRouter.delete('/:id', verifyToken, companyController.deleteCompany)

export default companyRouter
