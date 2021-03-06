
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
DATABASE=vote-api        
JWT_SECRET=            
MONGODB_HOST=		           
MONGODB_PORT=		    	      
MONGODB_USERNAME=  			    
MONGODB_PASSWORD=				     
PORT=8800						          
REDIS_PROT=				          	
REDIS_HOST=			           
REDIS_PASSWORD=			       
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

