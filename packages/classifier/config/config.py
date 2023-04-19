import configparser

parser = configparser.ConfigParser()
parser.read('./config.ini')

print(parser.sections())
print(parser['openai']['ACCESS_KEY'])
print(parser['database']['HOST'])