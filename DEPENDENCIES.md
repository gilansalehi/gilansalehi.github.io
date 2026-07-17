# External Runtime Dependency

The Firefox import-map shim is versioned and integrity-pinned in `index.html`. The data-wrapper runtime intentionally uses the unversioned `/dist` artifacts without integrity pins so consuming sites receive compatible framework updates.

| Artifact | SHA-384 |
| --- | --- |
| `https://ga.jspm.io/npm:es-module-shims@2.8.1/dist/es-module-shims.js` | `Ojz/JNsyOdkNfGWOlfhDmeq68SXcsoWSABV4yVQn8Wr/YaKJJTrZs5p2Zi39PWuL` |

To verify an artifact before updating its pin:

```bash
curl -L --fail --silent --show-error URL | openssl dgst -sha384 -binary | openssl base64 -A
```

Both cross-origin hosts must continue returning a JavaScript MIME type and `Access-Control-Allow-Origin: *`. A changed shim artifact will fail closed until its reviewed hash is updated here and in `index.html`.
