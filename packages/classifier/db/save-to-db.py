import psycopg2
import configparser
import csv

# Read credentials
config = configparser.ConfigParser()
config.read('../config/config.ini')

# Connect to db
""" Connect to database """
connection = psycopg2.connect(
  host=config['db']['HOST'],
  port=config['db']['PORT'],
  database=config['db']['NAME'],
  user=config['db']['USER'],
  password=config['db']['PASSWORD']
)

cursor = connection.cursor()

# Add the iteration number for which data needs to populated in the db
queries_file = open('../dataset/raw-data.csv')
queries_reader = csv.reader(queries_file, delimiter=',')

next(queries_reader)

# id equals to the the id of last of record
id = 1

for query in queries_reader:
  cursor.execute(f"INSERT INTO training_query(id, query, completion) VALUES ({id}, '{query[0]}', '{query[1]}');")
  id+=1

connection.commit()
cursor.close()