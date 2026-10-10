const TEMPLATE_HEX = "76045c4baa54876375788201419d75768201419d757820f7c62443473f361ca85047d2cc3486f9c77c54fac86451757d96ffee1b2dcdaeac69762022d3904ed8fc87b18ef2116f19ca43de6d59973b031bd116f0b9c717385d09eaac69757551677604583ddf7b876375788201419d75768201419d757820f7c62443473f361ca85047d2cc3486f9c77c54fac86451757d96ffee1b2dcdaeac6976208c2e11f4a03edb5505608a287317733f47531a61b75dd20bc3e6859f48af6b0eac6975755167760410e2e660876375788201419d75768201419d75782022d3904ed8fc87b18ef2116f19ca43de6d59973b031bd116f0b9c717385d09eaac6976208c2e11f4a03edb5505608a287317733f47531a61b75dd20bc3e6859f48af6b0eac69757551676a686868"

const ORIGINAL_KEYS = [
  "f7c62443473f361ca85047d2cc3486f9c77c54fac86451757d96ffee1b2dcdae",
  "22d3904ed8fc87b18ef2116f19ca43de6d59973b031bd116f0b9c717385d09ea",
  "8c2e11f4a03edb5505608a287317733f47531a61b75dd20bc3e6859f48af6b0e"
]

const KEY_OFFSETS = [
  [23, 120],
  [59, 217],
  [156, 253]
]

export function buildMultisigVaultBytecode(keyA, keyB, keyC) {
  const keys = [keyA, keyB, keyC].map(key => {
    const normalized = key.trim().toLowerCase()

    // Accept compressed KasWare public keys or 32-byte x-only keys
    const xonly = /^[0-9a-f]{66}$/.test(normalized) &&
      /^(02|03)/.test(normalized)
      ? normalized.slice(2)
      : normalized

    if (!/^[0-9a-f]{64}$/.test(xonly)) {
      throw new Error("Each public key must be a valid 32-byte x-only hex key")
    }

    return xonly
  })

  if (new Set(keys).size !== 3) {
    throw new Error("All three public keys must be different")
  }

  const bytes = Uint8Array.from(
    TEMPLATE_HEX.match(/../g),
    value => parseInt(value, 16)
  )

  ORIGINAL_KEYS.forEach((original, i) => {
    for (const offset of KEY_OFFSETS[i]) {
      const actual = Array.from(
        bytes.slice(offset, offset + 32),
        b => b.toString(16).padStart(2, "0")
      ).join("")

      if (actual !== original) {
        throw new Error("Multisig template verification failed")
      }

      const replacement = keys[i].match(/../g)

      replacement.forEach((value, j) => {
        bytes[offset + j] = parseInt(value, 16)
      })
    }
  })

  return bytes
}
