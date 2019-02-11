{
  "id" : "HEPop101",
  "socket": "https",
  "port": 8080,
  "address": "0.0.0.0",
  "tls": {
    "key": "/config/keys/cert.key",
    "cert": "/config/keys/cert.crt"
  },
  "queue": {
    "timeout": 2000,
    "maxSize": 1000,
    "useInterval": true
  },
  "dbName": "hep",
  "tableName": "hep",
  "db": {
        "rawSize": 8000,
	"loki" : {
	  "url": "http://loki:3100/api/prom/push"
	}
  },
  "metrics": {
        "influx":{
          "period": 30000,
          "expire": 300000,
          "dbName": "hep",
          "hostname": "influxdb:8086"
        }
  },
  "debug": true
}
