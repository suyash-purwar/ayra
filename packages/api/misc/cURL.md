# Important cURL requests

### Request for Uploading Bot Profile Picture
```
curl -X POST \
 https://graph.facebook.com/v16.0/upload:MTphdHRhY2htZW50OjViOGY3MDY0LThlZTMtNDg3My1hZjYwLWU5NmVlMjhhMjBjND9maWxlX2xlbmd0aD0xNTYwOSZmaWxlX3R5cGU9aW1hZ2UlMkZwbmc\=\?sig\=ARZeULBKTW6nwmHmMMc \
 --header "Authorization: OAuth EAAS46vtIZA0sBAOXdvaSxZBZBoLeJiBII8wgiexwvW7NCEIZAMZC5IJRl0qVAuQVGUXypft5H4hwnUUvVu6uUGS67lmWBMWhYg0MuPKg1rFCZAn1JBU44j7XoNbC9tmJatX02hVPNcLZBKDSFsZBn9HytqDjpSJv8cC4Oam22eKcj0WrWWxq0ZBRcZCEPL5cfofV4woYUyUZA8Oc3C4avQlivcz" \
 --header "file_offset: 0" \
 --data-binary @/media/suyash/HDD/realwork/lpu-bot-prototype/media/raw/lpu-small-logo.png
 ```

> Reference:
> 1. https://developers.facebook.com/docs/graph-api/guides/upload
> 2. https://developers.facebook.com/docs/whatsapp/cloud-api/reference/business-profiles

### Response
```
{"h":"4::aW1hZ2UvcG5n:ARY00DX6T14gG_FsMtO456W85L6TTS5vZVUoLumIKy2Ajt4laqDlllUQPrqTcdOZVeq4Zunl2CW3EafkY4OK7TPHNfwrL2xm-X4h1DFkNS-wTQ:e:1678139052:1329219284526923:100090649593857:ARaSWKe4wuIROWMLG_s"}
```

Note: 
1. h: Uploaded File's file handle