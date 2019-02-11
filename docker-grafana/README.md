# Jitsi MEET Homer
This compose demo outlines the basics to connect browser-side events to an HEP collector w/ Loki support

![image](https://user-images.githubusercontent.com/1423657/52583339-a4848680-2e2f-11e9-865a-5b2a26ad5169.png)

![image](https://user-images.githubusercontent.com/1423657/52584363-28d80900-2e32-11e9-90fb-ec412a177879.png)


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
