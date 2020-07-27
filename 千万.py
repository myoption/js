# encoding:utf-8
import pymysql
import time
import random

# 连接mysql
db = pymysql.connect(host='172.16.36.116', port=3306, db='test80', user='root',
                     passwd='f.yHA=(;G7op', charset='utf8')
# 获取mysql操作光标
cursor = db.cursor()
# 初始化变量
count = 0
# 设置sql语句循环次数
while count <= 100:
    count += 1
    # 定义mysql字段的范围随机数变量
    num = random.randint(0, 2)
    memo_num = random.randint(100, 111)
    city_list = ['长沙', '湘潭', '株洲', '衡阳']
    a = random.choice(city_list)
    # 生成mysql语句插入语句
    sql = "insert  into iodn_city(city_code,city_name,memo)values({},'{}',{})".format(
        num, a, memo_num)  # 执行sql语句
    try:
        cursor.execute(sql)
        db.commit()
    # 错误回滚
    except:
        db.rollback()
# 关闭mysql
db.close()
