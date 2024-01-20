// Routes
import PostsRoutes from './Post'
import PostCategoryRoutes from './PostCategory'
import PostComment from './PostComment'
import AccountRoutes from './Shared/Account'
import Files from './Shared/File'
import StatusRoutes from './Shared/Status/index'
import UserRoutes from './Users'

export default [
  AccountRoutes,
  PostCategoryRoutes,
  Files,
  PostsRoutes,
  StatusRoutes,
  UserRoutes,
  PostComment
]
