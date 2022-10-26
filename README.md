
## 关于项目
本项目是之前一个公司给予的面试题，一个简易的投票服务系统。
### 技术栈:
  - [NestJS](https://github.com/nestjs/nest) 
  - MongoDB
  - Redis

## 安装依赖

```bash
$ yarn install
```

## 关于设定


#### 在 config/env 中可以自行设定 Mongodb、Redis的链接参数
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


### 关于访问鉴权 角色控制 
``` bash
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

