# Jitsi MEET Homer
This compose demo outlines the basics to connect browser-side events to an HEP collector w/ Loki support

## Components
* JITSI MEET Stack (https TCP/8443)
* HOMER 7 HEPOP (http TCP/9080)
* LOKI (http TCP/3100)
* GRAFANA (http TCP/3000)

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
