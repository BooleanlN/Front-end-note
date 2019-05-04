import urllib.request
import re
import os
if __name__ == '__main__':
	os.chdir("F:\\备份\\JS\\特效\\source\\qq");
	url = "https://www.helloweba.net/demo/qqface/face/"
	for i in range(75):
		newurl = url+str(i+1)+'.gif'
		print(newurl)
		urllib.request.urlretrieve(newurl,str(i+1)+'.gif',None)