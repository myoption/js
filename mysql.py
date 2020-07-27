# import pymysql
# import random
# import time
#
#
# def gen_random_string():
#     '''产生随机字符串'''
#     char_list = list('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' +
#                      '0123456789-')
#     random.shuffle(char_list)
#     return ''.join(char_list)
#
#
# # 连接数据库
# connection = pymysql.connect(host='172.16.36.116',
#                              port=3306,
#                              user='root',
#                              passwd='f.yHA=(;G7op',
#                              db='test80')
# cursor = connection.cursor()
#
# start_time = time.time()
# i = 0
# while i < 1500000:
#     content = gen_random_string()
#     sql = "INSERT INTO test_data (content, hash) VALUES ('%s', '%d')" \
#         % (content, hash(content))
#     cursor.execute(sql)
#     i += 1
# connection.commit()
# connection.close()
# end_time = time.time()
# total_time = end_time - start_time
# print('插入150万条数据花费总时间为：' + str(total_time) + '秒')
import pymysql
import time

conn = pymysql.connect(host='172.16.36.116', port=3306, db='test80', user='root',
                       passwd='f.yHA=(;G7op', charset='utf8')
cur = conn.cursor()




def run222():
    # 批量插入方法
    s = time.time()
    data_list = [(i,) for i in range(800000)]
    sql = "insert into auth_group (name) values(%s)"
    total_count = cur.executemany(sql, data_list)
    conn.commit()
    cur.close()
    conn.close()
    e = time.time()

    print(total_count)
    print(e - s)



# print(e - s)


if __name__ == '__main__':
    # run111()      #3.05s
    run222()  # 0.13s
