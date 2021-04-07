set datestr=%date%
set result=%datestr:/=-%
echo %result%

F:
cd F:\mongodbcommandline

:: F:\mongodbcommandline\mongodump.exe --uri mongodb+srv://zhongfanadmin:ZhongFan042004@zhongfan-mongodb.zplyp.mongodb.net/ZhongFan

set outpath=D:\Github\ikarus\ikarus\mongobackups\backup%result%


F:\mongodbcommandline\mongoexport --uri mongodb+srv://zhongfanadmin:ZhongFan042004@zhongfan-mongodb.zplyp.mongodb.net/ZhongFan --collection Daedalus --type json --out %outpath%.json

F:\mongodbcommandline\mongoexport --uri mongodb+srv://zhongfanadmin:ZhongFan042004@zhongfan-mongodb.zplyp.mongodb.net/ZhongFan --collection Daedalus --type csv --fields=title,content,date --out %outpath%.csv


C: