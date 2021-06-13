
## 关于项目

本项目是采用 [Nest](https://github.com/nestjs/nest) 进行开发

## 安装依赖

```bash
$ yarn install
```

## 关于设定

```bash
在 config/env 中可以自行设定 mongodb、redis的链接参数
```
```bash
DATABASE=vote-api // 数据库名字
JWT_SECRET=!31CN5yzu7KG#IgqWEbvddw59 // JWT 加密密钥
MONGODB_HOST=119.29.170.194		// mongodb uri
MONGODB_PORT=27017		    	// mongodb port
MONGODB_USERNAME=sa  			// mongodb account
MONGODB_PASSWORD=sa				// mongodb password
PORT=8800						// api port
REDIS_PROT=6379					// redis port
REDIS_HOST=127.0.0.1			// redis uri
REDIS_PASSWORD=12323			// redis password
```
```bash
关于访问鉴权 角色控制 
import { RequireLogin, UserTypes, CurrentUser } from '../../core/decorators';
import { UserType } from '../../core/enum';

 在对应的路由中加入

  @RequireLogin()
  @UserTypes(UserType.ADMIN)
  @Post('/create')
  public async create(@Body() body: ActivityCreateModel) {
    return this.activityService.create(body);
  }
```
 ### 



## 如何运行

```bash
# development
$ yarn  start

# watch mode
$ yarn  start:dev

# production mode
$ yarn start:prod
```

