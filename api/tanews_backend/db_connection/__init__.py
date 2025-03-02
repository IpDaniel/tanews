from flaskext.mysql import MySQL
from pymysql import cursors

# initialize the database connection
db = MySQL(cursorclass=cursors.DictCursor)

