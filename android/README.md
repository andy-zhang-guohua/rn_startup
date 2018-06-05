# 2018-06-05
[Android Studio生成keystore签名文件](https://blog.csdn.net/anyanyan07/article/details/53493785)

生成 android/keystores/rn_amap.jks , password : rn_amap
```
>keytool -list -v -keystore android\keystores\rn_amap.jks

密钥库类型: JKS
密钥库提供方: SUN

您的密钥库包含 1 个条目

别名: rn_amap
创建日期: 2018-6-5
条目类型: PrivateKeyEntry
证书链长度: 1
证书[1]:
所有者: CN=Guohua Zhang, OU=None, O=None, L=Beijing, ST=Beijing, C=86
发布者: CN=Guohua Zhang, OU=None, O=None, L=Beijing, ST=Beijing, C=86
序列号: 7fb252e5
有效期开始日期: Tue Jun 05 16:19:30 GMT+08:00 2018, 截止日期: Sat May 30 16:19:30 GMT+08:00 2043
证书指纹:
         MD5: A5:7A:1C:F7:DB:E4:B8:49:22:BF:87:55:55:D8:3F:08
         SHA1: 3C:DF:AA:B4:2F:0F:3A:85:54:77:4D:2F:A3:72:DB:14:B4:31:06:93
         SHA256: 9F:8B:C6:C6:C4:B7:EC:39:13:16:DE:E1:5B:DB:7F:74:A7:64:58:CE:9D:9D:AB:ED:F1:23:6C:09:50:FB:0B:32
         签名算法名称: SHA256withRSA
         版本: 3

扩展:

#1: ObjectId: 2.5.29.14 Criticality=false
SubjectKeyIdentifier [
KeyIdentifier [
0000: 5C 69 24 DB 9A 4B 2B 70   A4 37 5A FA 35 1E 79 AB  \i$..K+p.7Z.5.y.
0010: D9 58 E2 03                                        .X..
]
]

```