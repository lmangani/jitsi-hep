# Jitsi MEET Homer
This compose demo outlines the basics to connect browser-side events to an HEP collector w/ Loki support

## Components
* JITSI MEET Stack (https TCP/8443)
* HOMER 7 Stack w/ Loki Support (http TCP/9080)
* LOKI (http TCP/3100)
* PASTASH (https TCP/9069)

## Jitsi Web Config
This demo leverages the Jitsi web `analyticsScriptUrls` to inject an event shipper into the live application:
```
// A list of scripts to load as lib-jitsi-meet "analytics handlers".
    analyticsScriptUrls: [
         "https://gitcdn.xyz/repo/lmangani/jitsi-hep/master/jitsi-hep.js"
     ],
```

### Notice
  * Browser might return CORS related events when running on different domains/hosts
  * Events are as-is without correlation, identifiers, etc
