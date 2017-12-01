'use strict';

const parsecurl = require('curl-parser-js').default;

// const cmd = `curl 'http://google.com/'  -H 'Accept-Encoding: gzip, deflate, sdch'  -H 'Accept-Language: en-US,en;q=0.8,da;q=0.6'  -H 'Upgrade-Insecure-Requests: 1'  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36'  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'  -H 'Connection: keep-alive'  --compressed`;

// const cmd = `curl 'http://localhost:3000/ncampaign/summary' -H 'If-None-Match: W/"21e-vVeo5Xyc9ngUFYU4BemjTT2UDeM"' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en-GB,en-US;q=0.8,en;q=0.6' -H 'Upgrade-Insecure-Requests: 1' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' -H 'Referer: http://localhost:3000/ncampaign/summary' -H 'Cookie: csrftoken=02B6uR9nR7Kd50Y8MLu0fQfXjsxsTNDGlNgqSOdzOeU3iaAA7oMxQGQ4NXmyFUO7' -H 'Connection: keep-alive' -H 'Cache-Control: max-age=0' --compressed`


// const cmd = `curl 'https://docs.google.com/spreadsheets/d/343rf34f_43r44r34r4/prefs/screenreader?id=343rf34f_43r44r34r4&token=9238fj938dh39gd92h3d932hd3ohf3f&includes_info_params=true' -H 'x-build: trix_2017.46-Tue_RC05' -H 'x-same-domain: 1' -H 'origin: https://docs.google.com' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: en-GB,en-US;q=0.8,en;q=0.6' -H 'x-chrome-uma-enabled: 1' -H 'x-rel-id: 50a.468870f8.s' -H 'cookie: S=apps-spreadsheets=5_WWS2YR3DwRMt5ZZlAoJR7PO2aUz0za;' -H 'x-client-data: CKi1yQEIh7bJAQimtskBCMG2yQEI+pzKAQipncoBCNKdygEIqKPKARjpl8oB' -H 'x-chrome-connected: id=112039066837307859765,mode=0,enable_account_consistency=false' -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' -H 'content-type: application/x-www-form-urlencoded;charset=UTF-8' -H 'accept: */*' -H 'referer: https://docs.google.com/spreadsheets/d/343rf34f_43r44r34r4/edit?ts=5a1f9a4e' -H 'authority: docs.google.com' --data 'enable=false' --compressed`;

// const cmd = `curl 'https://docs.google.com/spreadsheets/d/343rf34f_43r44r34r4/font/getmetadata?id=343rf34f_43r44r34r4&token=9238fj938dh39gd92h3d932hd3ohf3f&includes_info_params=true' -H 'x-build: trix_2017.46-Tue_RC05' -H 'x-same-domain: 1' -H 'origin: https://docs.google.com' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: en-GB,en-US;q=0.8,en;q=0.6' -H 'x-chrome-uma-enabled: 1' -H 'x-rel-id: 50a.468870f8.s' -H 'cookie: S=apps-spreadsheets=5_WWS2YR3DwRMt5ZZlAoJR7PO2aUz0za; ' -H 'x-client-data: CKi1yQEIh7bJAQimtskBCMG2yQEI+pzKAQipncoBCNKdygEIqKPKARjpl8oB' -H 'x-chrome-connected: id=112039066837307859765,mode=0,enable_account_consistency=false' -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' -H 'content-type: application/x-www-form-urlencoded;charset=UTF-8' -H 'accept: */*' -H 'referer: https://docs.google.com/spreadsheets/d/343rf34f_43r44r34r4/edit?ts=5a1f9a4e' -H 'authority: docs.google.com' --data 'families=Amatic%20SC%2CCaveat%2CComfortaa%2CEB%20Garamond%2CLobster%2CLora%2CMerriweather%2CMontserrat%2CNunito%2COswald%2CPacifico%2CPlayfair%20Display%2CRoboto%2CRoboto%20Mono%2CSpectral' --compressed`;

// const cmd = `curl 'https://exampleserver.com/api/v1/timetracking/' -H 'origin: https://exampleserver.com' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: en-GB,en-US;q=0.8,en;q=0.6' -H 'authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoiMjciLCJleHAiOjE1MTIyMTIyNzYsIm9yaWdfaWF0IjoxNTEyMTI1ODc2LCJ1c2VyX2lkIjo1MTAsImVtYWlsIjoibWFydWRodS5ndW5hc2VrYXJhbkBnYWxlcGFydG5lcnMuY29tIiwidXNlcm5hbWUiOiJtYXJ1ZGh1Lmd1bmFzZWthcmFuQGdhbGVwYXJ0bmVycy5jb20ifQ._Buw7yRBRRVBpdJ__2CK6w8DEhoocRMAxWYnRTmNcW0' -H 'content-type: application/json; charset=UTF-8' -H 'accept: */*' -H 'referer: https://exampleserver.com/timeSheetChange' -H 'authority: exampleserver.com' -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' --data-binary '{"action":"Custom","weekString":"November 27, 2017 - December 03, 2017"}' --compressed`;

// const cmd = `curl 'https://exampleserver.com/api/v1/save_week/' -H 'origin: https://exampleserver.com' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: en-GB,en-US;q=0.8,en;q=0.6' -H 'authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoiMjciLCJleHAiOjE1MTIyMTIyNzYsIm9yaWdfaWF0IjoxNTEyMTI1ODc2LCJ1c2VyX2lkIjo1MTAsImVtYWlsIjoibWFydWRodS5ndW5hc2VrYXJhbkBnYWxlcGFydG5lcnMuY29tIiwidXNlcm5hbWUiOiJtYXJ1ZGh1Lmd1bmFzZWthcmFuQGdhbGVwYXJ0bmVycy5jb20ifQ._Buw7yRBRRVBpdJ__2CK6w8DEhoocRMAxWYnRTmNcW0' -H 'content-type: application/json; charset=UTF-8' -H 'accept: */*' -H 'referer: https://exampleserver.com/timeSheetChange' -H 'authority: exampleserver.com' -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' --data-binary '{"data":[{"SatH":"Sat 2","timesheetTotal":{"SunTotal":0,"WeekTotal":40,"TueTotal":8,"MonTotal":8,"WedTotal":8,"SatTotal":0,"ThuTotal":8,"FriTotal":8},"projects":[{"id":-2,"name":"","client":"GALE Partners","project_id":255750,"isBilled":true,"days":{"MonT":"8","TueT":"8","WedT":"8","ThuT":"8","FriT":"8","SatT":"","SunT":"","MonM":"alchemy","TueM":"alchemy","WedM":"alchemy","ThuM":"alchemy","FriM":"alchemy","SatM":"","SunM":""},"totT":40}],"MonH":"Mon 27","FriH":"Fri 1","SunH":"Sun 3","weekString":"November 27, 2017 - December 03, 2017","WedH":"Wed 29","ThuH":"Thu 30","TueH":"Tue 28"}]}' --compressed`;


const cmd = `curl 'http://server.com:5050/a/c/getName/?param1=pradeep&param2=kumar&param3=sharma'`;

// const cmd = `curl 'http://server.com:5050/a/c/getName'`;

// const cmd = `curl 'https://exampleserver.com/api/v5/tracktime/' -H 'origin: https://exampleserver.com' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: en-GB,en-US;q=0.8,en;q=0.6' -H 'authorization: JWT eyJiOjE1MTIyMTIyNzYsIm9yaiOjE1MTIyMTIyNzYsIm9yaJ9.eyJ2ZXJzaW9uIjoiMjciLCJleHAiOjE1MTIyMTIyNzYsIm9yaiOjE1MTIyMTIyNzYsIm9yaLCJ1c2VyX2lkIjo1MTAsImVtYWlsIjoibWFydWRodS5ndW5iOjE1MTIyMTIyNzYsIm9yam5hbWUiOiJtYXJ1ZGh1Lmd1iOjE1MTIyMTIyNzYiOjE1MTIyMTIyNzYsIm9yafQ._BuiOjE1MTIyMTIyNzYsIm9yadJ__2iOjE1MTIyMTIyNzYsIm9yaRTmNcW0' -H 'content-type: application/json; charset=UTF-8' -H 'accept: */*' -H 'referer: https://exampleserver.com/timeSheetChange' -H 'authority: exampleserver.com' -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' --data-binary '{"action":"Add custom time","data":"November 27, 2017 - December 03, 2017"}' --compressed`;


const res = parsecurl(cmd);
console.log('\nOutput: ');
console.log(JSON.stringify(res, null, 2));
