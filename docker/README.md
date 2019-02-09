# Jitsi MEET Homer
This compose demo outlines the basics to connect browser-side events to an HEP collector w/ Loki support

```
docker-compose up -d
```

![ezgif com-optimize 23](https://user-images.githubusercontent.com/1423657/52521517-7f99e300-2c78-11e9-9df5-dbf3e739108c.gif)

## Components
* Jitsi Meet Stack (https TCP/8443) + HEP Analytics Handler
* HOMER 7 Stack w/ Loki Support (http TCP/9080)
* HEPop RTC Socket (https TCP/9069)
* Loki (http TCP/3100)
* InfluxDB (http TCP/8086)
* Chronograf (http TCP/8888)

![image](https://user-images.githubusercontent.com/1423657/52523328-6e5cd080-2c90-11e9-9e8d-02da54864c62.png)

## Jitsi Web Config
This demo leverages the Jitsi web `"analytics handlers"` to inject an event shipper into the live application:
```
    analyticsScriptUrls: [
         "https://gitcdn.xyz/repo/lmangani/jitsi-hep/master/jitsi-hep.js"
     ],
```

### Notice
  * Browser might return CORS related events when running on different domains/hosts
  * Events are as-is without correlation, identifiers, etc
