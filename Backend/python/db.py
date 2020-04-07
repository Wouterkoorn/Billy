import sqlalchemy

def get_db():
    engine = sqlalchemy.create_engine('mysql+pymysql://python:luca@localhost/billydb')
    return engine.connect()


def close_db(db):
    db.close()


def execute_sql(sql):
    mydb = get_db()
    result = mydb.execute(sql)
    close_db(mydb)
    return result

