<img src="https://heavenmssurveyhome.files.wordpress.com/2018/12/heavenmslogo.png"  width="370" height="auto">

## MapleStory GMS 0.83 汉化以优化

- [x] Maven
- [x] 主程序汉化(90%)
- [x] WZ汉化(95%)
- [ ] 服务端汉化
- [ ] 脚本引擎替换
- [ ] WZ优化(MCDB & NX File)
- [ ] WEB控制台
---
### 打包
> 打包会稍慢，包含完整wz文件和脚本
#### maven命令打包
```
mvn clean package
```

#### 运行
运行target/HeavenMS/bin/中文对应文件
```
HeavenMS
│   
└───bin
│   │   start.bat (win)
│   │   start.sh (linux)
│   └───wz
│       │   ...
│   
└───conf
│   │   config.yaml (配置文件)
│   └───script
│       │   ...
```

