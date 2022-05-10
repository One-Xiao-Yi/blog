# Xiao Yi Blog
一个使用markdown形式编写博客的项目，支持多用户使用，可自由浏览所有博客。
## 前端
前端使用[Ant Design Pro](https://pro.ant.design/)框架，开箱即用的中台前端/设计解决方案，详细使用可点击链接，进入官网查看。  
markdown编写使用[react-markdown-editor-lite](https://github.com/HarryChen0506/react-markdown-editor-lite)，markdown渲染部分使用[markdown-it](https://github.com/markdown-it/markdown-it)。  
blog-ui内包含pom文件，使用[frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin)插件，实现在后台项目打包时，自动打包前端资源。该插件支持下载node、npm、yarn等，执行install、build等命令，完成前端资源的打包，配合[maven-antrun-plugin](https://github.com/apache/maven-antrun-plugin)插件，可实现自动打包，并将打包后的文件拷贝到后台项目的资源文件目录下，使后台项目打包后，生成一个包含前端资源的spring boot项目。但我本地无法通过插件直接执行build命令，所以本项目下的maven配置并不完整，如需使用，可参考[dubbo-admin](https://github.com/apache/dubbo-admin)的maven配置。
## 前端本地启动
如果需要本地开发，下载项目后，可按以下步骤启动（默认本地包含node、npm或yarn环境）：
1.进入blog-ui目录下  
2.命令行中执行以下命令，下载前端依赖  
```
yarn
或
npm install
```
3.下载依赖后，执行以下命令启动
```
yarn start
或
npm run start
```
## 后台
后台使用spring boot框架，各个功能模块被拆分为一个个的小maven模块，其中包含：
#### 文件管理模块
文件管理模块使用[minio](http://www.minio.org.cn/)工具，管理所有文件。代码中提供文件上传、下载接口，并加有确认机制，直接上传的文件为临时文件，只有通过commit的文件才会永久保存（但目前还没做删除临时文件的定时任务功能）。
#### 用户管理模块
用户模块不直接提供用户相关操作接口，只提供登录相关接口。使用Jwt生成Token，来供用户调用包含身份认证的接口。
#### 博客管理模块
博客管理模块提供基础的增删改查接口，但博客正文存储与文件中，不会直接存储在数据库中。
#### 其他
除以上模块外，还包含bom、common模块，分别提供统一依赖管理和公用bean、工具等功能，start模块，提供启动项目功能。
## 打包
如使用maven插件实现了自动打包，则直接在blog层级打包即可。  
如无法自动打包，可在blog-ui目录下运行
```
yarn build
或
npm run build
```
命令，对前端资源进行打包，打包后的文件会生成与同目录下的dist文件夹加下，将该文件夹下的所有文件拷贝至后台start模块下的资源文件下的public目录下，之后在blog-server层级打包后台项目即可。
