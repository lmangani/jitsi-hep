# Jitsi MEET Homer
This compose demo outlines the basics to connect browser-side events to an HEP collector w/ Loki support

```
docker-compose up -d
```

## Components
* Jitsi Meet Stack (https TCP/8443) + HEP Analytics Handler
* HOMER 7 Stack w/ Loki Support (http TCP/9080)
* HEPop RTC Socket (https TCP/9069)
* Loki (http TCP/3100)
* InfluxDB (http TCP/8086)
* Chronograf (http TCP/8888)

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
