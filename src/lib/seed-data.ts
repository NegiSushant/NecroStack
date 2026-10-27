// NecroStack Synthetic Dataset: "Crypt Relics + Modern API Migration Grimoire"

export interface GrimoirePattern {
  era_category: string;
  deprecated_pattern: string;
  modern_replacement_title: string;
  rule_text: string;
  code_example: string;
}

export interface DeadRelic {
  relic_code: string;
  filename: string;
  original_author: string;
  abandoned_year: number;
  source_language: string;
  era_category: string;
  backstory: string;
  legacy_code: string;
  known_symptoms: string[];
  expected_soul_invariants: Record<string, any>;
  status: "IN_CRYPT" | "REANIMATED" | "VERIFIED";
}

export const migrationGrimoirePatterns: GrimoirePattern[] = [
  // Node.js v4 Legacy Crypto
  {
    era_category: "Node.js v4 Legacy Crypto",
    deprecated_pattern: "new Buffer(secret, binary) & crypto.createCipher",
    modern_replacement_title:
      "Zero-Dependency AES-256-GCM Encryption with Buffer.from and Explicit IV",
    rule_text: `Replace vulnerable 'new Buffer()' constructor (CVE-2018-7167 uninitialized memory leak) with 'Buffer.from(secret, "utf-8")' or 'Buffer.alloc()'.
Eliminate deprecated 'crypto.createCipher' which relies on obsolete OpenSSL EVP_BytesToKey MD5 key derivation without an initialization vector.
Upgrade to 'crypto.createCipheriv("aes-256-gcm", derivedKey, iv)' using an explicit 12-byte cryptographically secure random IV generated via 'crypto.randomBytes(12)'.
Pack the initialization vector, ciphertext, and authentication tag into a single concatenated or delimited payload to guarantee authenticated integrity and prevent padding oracle attacks.
Convert nested error-first callback pyramids to modern async/await patterns with zero external npm dependencies.`,
    code_example: `import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // Standard 96-bit IV for AES-GCM
const SALT = "necrostack-reanimated-salt-2026";

export function deriveKey(password: string): Buffer {
  return scryptSync(password, SALT, 32);
}

export async function encryptPayload(plaintext: string, secret: string): Promise<string> {
  const key = deriveKey(secret);
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(Buffer.from(plaintext, "utf-8")),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  // Format: iv:authTag:ciphertext (all in hex or base64url)
  return [
    iv.toString("base64url"),
    authTag.toString("base64url"),
    encrypted.toString("base64url"),
  ].join(".");
}

export async function decryptPayload(packedPayload: string, secret: string): Promise<string> {
  const [ivB64, authTagB64, cipherB64] = packedPayload.split(".");
  if (!ivB64 || !authTagB64 || !cipherB64) {
    throw new Error("Invalid encrypted payload format");
  }

  const key = deriveKey(secret);
  const iv = Buffer.from(ivB64, "base64url");
  const authTag = Buffer.from(authTagB64, "base64url");
  const ciphertext = Buffer.from(cipherB64, "base64url");

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  return Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]).toString("utf-8");
}`,
  },
  {
    era_category: "Node.js v4 Legacy Crypto",
    deprecated_pattern:
      "URL-Safe Base64 Padding Stripping & Timing Attacks",
    modern_replacement_title:
      "Constant-Time URL-Safe Base64 HMAC Token Verification with Clock-Skew Grace",
    rule_text: `When parsing legacy URL-safe Base64 tokens, preserve the exact historical behavior where '+' is replaced with '-', '/' with '_', and trailing '=' padding characters are stripped ('replace(/=+$/, "")').
Use Node.js 'base64url' encoding natively or implement standard regex unpadding.
To prevent side-channel timing attacks on HMAC signatures, always verify cryptographic signatures using 'crypto.timingSafeEqual' instead of JavaScript '===' equality checks.
Preserve the critical distributed-system 'Soul' edge case: allow an explicit 30-second NTP clock-skew tolerance window ('Math.abs(nowSec - issuedAtSec) <= 30') when validating token creation or expiration timestamps. This prevents intermittent invalid token errors across unsynchronized clustered nodes.`,
    code_example: `import { createHmac, timingSafeEqual } from "node:crypto";

export interface DecodedToken {
  userId: string;
  issuedAt: number;
  nonce: string;
}

export function toBase64Url(buffer: Buffer): string {
  return buffer.toString("base64url"); // Replaces +, / and removes =
}

export function signTokenPayload(payload: DecodedToken, secret: string): string {
  const json = JSON.stringify(payload);
  const dataB64 = Buffer.from(json, "utf-8").toString("base64url");
  const signature = createHmac("sha256", secret).update(dataB64).digest();
  return \`\${dataB64}.\${toBase64Url(signature)}\`;
}

export function verifyTokenWithClockSkew(
  token: string,
  secret: string,
  clockSkewGraceSeconds = 30
): DecodedToken {
  const [dataB64, sigB64] = token.split(".");
  if (!dataB64 || !sigB64) {
    throw new Error("Malformed token format");
  }

  // 1. Constant-time signature verification
  const expectedSig = createHmac("sha256", secret).update(dataB64).digest();
  const providedSig = Buffer.from(sigB64, "base64url");

  if (
    expectedSig.length !== providedSig.length ||
    !timingSafeEqual(expectedSig, providedSig)
  ) {
    throw new Error("Cryptographic signature verification failed");
  }

  // 2. Decode payload
  const rawJson = Buffer.from(dataB64, "base64url").toString("utf-8");
  const payload = JSON.parse(rawJson) as DecodedToken;

  // 3. Soul Invariant: 30-second clock skew grace window
  const nowSec = Math.floor(Date.now() / 1000);
  const drift = Math.abs(nowSec - payload.issuedAt);
  if (drift > clockSkewGraceSeconds && payload.issuedAt > nowSec + clockSkewGraceSeconds) {
    throw new Error(\`Token issued in future beyond clock-skew threshold (\${drift}s)\`);
  }

  return payload;
}`,
  },

  // Query 1.8 DOM & AJAX
  {
    era_category: "jQuery 1.8 DOM & AJAX",
    deprecated_pattern:
      "$.fn.live() Event Delegation & Synchronous $.ajax / $.Deferred.pipe()",
    modern_replacement_title:
      "Modern Event Delegation with AbortController, Native fetch, and Exponential Backoff",
    rule_text: `jQuery '.live()' was deprecated in 1.7 and completely removed in jQuery 1.9. Replace document-level '.live()' bindings with native DOM event delegation using 'parentElement.addEventListener(eventType, handler)' combined with 'event.target.closest(selector)'.
Replace deprecated '$.Deferred().pipe()' chaining and synchronous 'async: false' AJAX calls (which freeze the browser main thread) with modern 'fetch()' coupled with 'AbortController' for deterministic timeout control.
Implement zero-dependency exponential backoff retry loops for transient HTTP 5xx network glitches without mutating global variables like 'window.__POLTERGEIST_LOCK'. Use localized scoped AbortSignals and async mutex locks.`,
    code_example: `export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  timeoutMs?: number;
}

export async function fetchWithBackoff<T>(
  url: string,
  options: RequestInit = {},
  retryOptions: RetryOptions = {}
): Promise<T> {
  const { maxRetries = 3, initialDelayMs = 200, timeoutMs = 5000 } = retryOptions;
  let attempt = 0;

  while (attempt <= maxRetries) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!res.ok) {
        if (res.status >= 500 && attempt < maxRetries) {
          throw new Error(\`Server error HTTP \${res.status}\`);
        }
        const errorText = await res.text();
        throw new Error(\`Request failed with status \${res.status}: \${errorText}\`);
      }

      return (await res.json()) as T;
    } catch (err: any) {
      clearTimeout(timeout);
      attempt++;
      if (attempt > maxRetries) {
        throw err;
      }
      const delay = initialDelayMs * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error("Exceeded max retries");
}

export function delegateEvent<T extends HTMLElement>(
  root: Document | HTMLElement,
  eventType: string,
  selector: string,
  handler: (event: Event, targetElement: T) => void
): () => void {
  const listener = (event: Event) => {
    const target = event.target as HTMLElement | null;
    const matched = target?.closest<T>(selector);
    if (matched && root.contains(matched)) {
      handler(event, matched);
    }
  };

  root.addEventListener(eventType, listener);
  return () => root.removeEventListener(eventType, listener);
}`,
  },
  {
    era_category: "jQuery 1.8 DOM & AJAX",
    deprecated_pattern:
      "Multi-Select Bracket Key Stripping & CJK IME Enter Key Submission",
    modern_replacement_title:
      "IME Composition Keystroke Guard & FormData Bracket-Key Array Normalizer",
    rule_text: `Preserve the two critical historical 'Soul' edge cases embedded in legacy jQuery form serializers:
1. Multi-Select Bracket Normalization: Forms often transmit multiple checkboxes or multi-select inputs with names ending in '[]' (e.g., 'tags[]', 'permissions[]'). When converting HTML forms or FormData to JSON, extract all values using 'formData.getAll(name)', strip the '[]' suffix, and deduplicate values into clean arrays, while retaining standard scalar strings for single inputs.
2. CJK / Asian IME Composition Lock: When users type in Japanese, Chinese, or Korean, pressing 'Enter' confirms candidate ideographs. Legacy jQuery code hooked 'keydown' or keyCode 229 to avoid submitting the form mid-composition. Modern TypeScript code must check 'event.isComposing' (or 'event.keyCode === 229') and immediately abort submit handling if IME composition is active.`,
    code_example: `export function serializeFormWithSoul(form: HTMLFormElement): Record<string, any> {
  const formData = new FormData(form);
  const result: Record<string, any> = {};

  for (const key of formData.keys()) {
    const isArrayKey = key.endsWith("[]");
    const cleanKey = isArrayKey ? key.slice(0, -2) : key;

    if (isArrayKey) {
      const allValues = formData.getAll(key).map((v) => String(v).trim());
      // Deduplicate array values while preserving ordering
      result[cleanKey] = Array.from(new Set(allValues));
    } else {
      const value = formData.get(key);
      result[cleanKey] = typeof value === "string" ? value.trim() : value;
    }
  }

  return result;
}

export function attachImeSafeFormListener(
  form: HTMLFormElement,
  onSubmit: (data: Record<string, any>) => void
): () => void {
  let isComposing = false;

  const onCompositionStart = () => {
    isComposing = true;
  };
  const onCompositionEnd = () => {
    isComposing = false;
  };

  const onKeyDown = (e: KeyboardEvent) => {
    // If Enter is pressed while composing CJK characters, lock submit
    if (e.key === "Enter" && (isComposing || e.isComposing || e.keyCode === 229)) {
      e.stopPropagation();
    }
  };

  const onFormSubmit = (e: SubmitEvent) => {
    if (isComposing) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    const data = serializeFormWithSoul(form);
    onSubmit(data);
  };

  form.addEventListener("compositionstart", onCompositionStart);
  form.addEventListener("compositionend", onCompositionEnd);
  form.addEventListener("keydown", onKeyDown);
  form.addEventListener("submit", onFormSubmit);

  return () => {
    form.removeEventListener("compositionstart", onCompositionStart);
    form.removeEventListener("compositionend", onCompositionEnd);
    form.removeEventListener("keydown", onKeyDown);
    form.removeEventListener("submit", onFormSubmit);
  };
}`,
  },

  // Python 2.7 Financial & IO
  {
    era_category: "Python 2.7 Financial & IO",
    deprecated_pattern:
      "urllib2 + xrange + iteritems + Python 2 Floor Division",
    modern_replacement_title:
      "TypeScript Async Generators, Native Fetch, and Strict Currency Arithmetic",
    rule_text: `Migrate Python 2.7 legacy IO, iterators, and syntax into zero-dependency TypeScript:
1. Replace 'urllib2.urlopen' with native 'fetch' streaming or async chunks.
2. Replace memory-intensive lists and Python 2 'xrange()' / 'dict.iteritems()' with TypeScript ES2026 generators ('function*') and async iterators ('AsyncIterableIterator<T>') for zero-memory stream processing over large financial ledgers.
3. Fix Python 2 silent floor division bugs: In Python 2, integer division 'cents / 100' silently truncates fractions (e.g. 150 / 100 = 1 instead of 1.5). In TypeScript, enforce explicit cents-based integer math ('BigInt(cents)' or Math-based scaling) with explicit decimal precision to avoid floating-point binary inaccuracies.`,
    code_example: `export interface LedgerRow {
  transactionId: string;
  account: string;
  amountCents: bigint;
  taxRatePercent: number;
}

export function* rangeGenerator(start: number, end: number, step = 1): Generator<number> {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

export async function* streamLedgerRows(
  csvUrl: string
): AsyncIterableIterator<string[]> {
  const response = await fetch(csvUrl);
  if (!response.ok || !response.body) {
    throw new Error(\`Failed to fetch CSV stream: HTTP \${response.status}\`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split(/\\r?\\n/);
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.trim().length > 0) {
        yield line.split(",").map((s) => s.trim());
      }
    }
  }

  if (buffer.trim().length > 0) {
    yield buffer.split(",").map((s) => s.trim());
  }
}`,
  },
  {
    era_category: "Python 2.7 Financial & IO",
    deprecated_pattern:
      "Python 2 Latin-1 CSV Header BOM & Sub-Cent Half-to-Even Rounding",
    modern_replacement_title:
      "Deterministic Banker's Rounding, UTF-8 BOM Stripping, and Accounting Negatives",
    rule_text: `Preserve the two critical accounting 'Soul' edge cases found in legacy Python financial parsers:
1. Banker's Rounding (Round-Half-to-Even): Standard Math.round() introduces systematic upward bias in ledger books by always rounding .5 upward. IEEE 754 Banker's Rounding rounds exact .5 fractions to the nearest EVEN integer (e.g., 2.5 becomes 2, while 3.5 becomes 4). This guarantees neutral statistical tax distributions across tens of thousands of journal rows.
2. UTF-8 BOM Stripping & Accounting Parentheses: Legacy bank exports often prepend the UTF-8 Byte Order Mark ('\\uFEFF' / 0xEF, 0xBB, 0xBF) to the first header column. Furthermore, accounting balances represent negative amounts with parentheses, e.g., '(1,250.50)' instead of '-1250.50'. Strip the BOM cleanly from headers and parse parenthesized currency strings into negative floating-point numbers or integer cents.`,
    code_example: `/**
 * Banker's Rounding (Round-Half-to-Even)
 * Rounds values ending in exactly .5 to the nearest even integer.
 */
export function roundHalfToEven(value: number): number {
  const floor = Math.floor(value);
  const diff = Number((value - floor).toFixed(8));

  if (Math.abs(diff - 0.5) < 1e-7) {
    return floor % 2 === 0 ? floor : floor + 1;
  }
  return Math.round(value);
}

/**
 * Strips leading UTF-8 Byte Order Mark (\\uFEFF) from CSV headers or text lines.
 */
export function stripUtf8Bom(content: string): string {
  if (content.charCodeAt(0) === 0xfeff) {
    return content.slice(1);
  }
  return content;
}

/**
 * Parses currency strings, handling accounting parentheses negative amounts
 * like "(1,250.50)" -> -1250.50 and stripping currency symbols.
 */
export function parseAccountingCurrency(raw: string): number {
  let cleaned = raw.trim().replace(/[\\$,]/g, "");

  const isParenthesesNegative = cleaned.startsWith("(") && cleaned.endsWith(")");
  if (isParenthesesNegative) {
    cleaned = cleaned.slice(1, -1).trim();
  }

  const parsed = parseFloat(cleaned);
  if (Number.isNaN(parsed)) {
    throw new Error(\`Unparseable currency figure: "\${raw}"\`);
  }

  return isParenthesesNegative ? -Math.abs(parsed) : parsed;
}`,
  },
];

export const deadRelics: DeadRelic[] = [
  // RELIC 1: ghost-vault-2015.js
  {
    relic_code: "RELIC-2015-001",
    filename: "ghost-vault-2015.js",
    original_author: "@marcus_v_oss (Last commit: Oct 31, 2015)",
    abandoned_year: 2015,
    source_language: "Node.js v4 (CommonJS)",
    era_category: "Node.js v4 Legacy Crypto",
    backstory:
      "Created on Halloween 2015 by Marcus V., GhostVault was an ultra-lightweight micro-token encryption utility designed for early battery-powered IoT smart locks and telemetry nodes. It provided fast CommonJS HMAC signing and payload encryption with zero dependencies. When Node.js v4 introduced LTS breaking changes and uninitialized memory disclosures in the Buffer constructor, Marcus burned out from corporate open-source demands and disappeared from GitHub, leaving millions of embedded devices running this unmaintained cryptographic phantom.",
    legacy_code: `/**
 * GhostVault v1.0.4 - Lightweight Crypto Vault & Token Signer
 * Author: @marcus_v_oss
 * Abandoned: Oct 31, 2015
 * Runtime: Node.js v4 (CommonJS)
 */
var crypto = require('crypto');

function GhostVault(secret) {
  if (!secret) throw new Error("GhostVault requires master secret key");
  // DEAD PATTERN: new Buffer(secret, 'binary') is deprecated and vulnerable to CVE-2018-7167
  this.secret = new Buffer(secret, 'binary');
}

GhostVault.prototype.encryptPayload = function(plainText, callback) {
  var self = this;
  process.nextTick(function() {
    try {
      // DEAD PATTERN: crypto.createCipher with implicit MD5 and no initialization vector (IV)
      var cipher = crypto.createCipher('aes-256-cbc', self.secret);
      var crypted = cipher.update(plainText, 'utf8', 'base64');
      crypted += cipher.final('base64');

      // DEAD PATTERN: Allocating uninitialized memory buffer
      var scratch = new Buffer(256);
      scratch.fill(0);

      // SOUL INVARIANT 2: URL-safe Base64 normalization
      // Replace '+' with '-', '/' with '_', and strip trailing '=' padding characters
      var urlSafe = crypted.replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');

      callback(null, urlSafe);
    } catch (err) {
      callback(err);
    }
  });
};

GhostVault.prototype.verifyToken = function(tokenString, maxAgeSeconds, callback) {
  var parts = tokenString.split('.');
  if (parts.length !== 2) {
    return callback(new Error("Malformed token format"));
  }

  var payloadEncoded = parts[0];
  var signature = parts[1];

  // SOUL INVARIANT 1: Distributed NTP 30-Second Clock-Skew Grace Window
  // IoT gateway clocks drift slightly. We allow +/- 30 seconds clock drift
  var rawJson = new Buffer(payloadEncoded.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
  var payload;
  try {
    payload = JSON.parse(rawJson);
  } catch (e) {
    return callback(new Error("JSON parse error"));
  }

  var nowSec = Math.floor(Date.now() / 1000);
  var issuedAt = payload.iat || 0;
  var clockSkewGrace = 30;

  if (Math.abs(nowSec - issuedAt) > clockSkewGrace && issuedAt > nowSec + clockSkewGrace) {
    return callback(new Error("Token timestamp rejected beyond 30s NTP drift tolerance"));
  }

  if (maxAgeSeconds && (nowSec - issuedAt) > maxAgeSeconds) {
    return callback(new Error("Token expired"));
  }

  // DEAD PATTERN: Non-constant time string comparison vulnerable to timing attacks
  var hmac = crypto.createHmac('sha256', this.secret);
  hmac.update(payloadEncoded);
  var expectedSig = hmac.digest('base64').replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');

  if (signature !== expectedSig) {
    return callback(new Error("Invalid HMAC signature"));
  }

  callback(null, payload);
};

module.exports = GhostVault;
`,
    known_symptoms: [
      "DEP0005: Buffer() constructor is deprecated due to security and usability issues. Use Buffer.alloc() or Buffer.from()",
      "CVE-2018-7167: Uninitialized Buffer allocation leaks process memory across tenant boundaries",
      "Error: crypto.createCipher is deprecated and insecure (lacks initialization vector and uses broken MD5 key derivation)",
      "Vulnerability: Signature comparison via '===' is susceptible to timing side-channel attacks",
      "Callback hell anti-pattern makes modern async error boundary handling impossible",
    ],
    expected_soul_invariants: {
      clock_skew_grace_window: {
        invariant: "30-Second NTP Clock-Skew Grace Window",
        description:
          "Accepts token timestamps with Math.abs(nowSec - issuedAtSec) <= 30 drift tolerance for distributed unsynchronized nodes",
      },
      url_safe_base64_normalization: {
        invariant: "URL-Safe Base64 Padding Stripping",
        description:
          "Replaces '+' with '-', '/' with '_', and strips trailing '=' padding characters to ensure URL/query string safety",
      },
    },
    status: "IN_CRYPT",
  },

  // RELIC 2: jquery-form-poltergeist.js
  {
    relic_code: "RELIC-2013-002",
    filename: "jquery-form-poltergeist.js",
    original_author: "@elena_dom_wizard (Last commit: Nov 2, 2013)",
    abandoned_year: 2013,
    source_language: "ES5 + jQuery 1.8",
    era_category: "jQuery 1.8 DOM & AJAX",
    backstory:
      "Crafted in late 2013 by Elena, FormPoltergeist was the crown jewel of pre-React AJAX form handling for multi-page enterprise CRM apps. It solved thorny browser bugs, handled dynamic DOM injection, and serialized nested arrays before modern Web APIs existed. When jQuery 1.9 abruptly removed $.fn.live() without an automatic codemod and modern frameworks took over, Elena shifted careers to botanical illustration, leaving thousands of corporate internal intranets haunted by this poltergeist.",
    legacy_code: `/**
 * jQuery FormPoltergeist v0.8.2
 * Author: @elena_dom_wizard
 * Abandoned: Nov 2, 2013
 * Runtime: ES5 + jQuery 1.8.3
 */
(function($) {
  // Global pollution anti-pattern
  window.__POLTERGEIST_LOCK = false;

  var isComposing = false;

  // SOUL INVARIANT 2: Asian / CJK IME Composition Keystroke Lock
  // Prevent Enter key while typing Japanese Kanji or Korean Hangul from submitting early!
  $(document).on('compositionstart', function() {
    isComposing = true;
  });
  $(document).on('compositionend', function() {
    isComposing = false;
  });

  // DEAD PATTERN: $.fn.live() removed completely in jQuery 1.9+
  $('form.poltergeist-ajax').live('submit', function(e) {
    e.preventDefault();
    var $form = $(this);

    // Soul Check: Guard against IME Enter keypress submission
    if (isComposing) {
      return false;
    }

    if (window.__POLTERGEIST_LOCK) {
      return false;
    }
    window.__POLTERGEIST_LOCK = true;

    // SOUL INVARIANT 1: Multi-Select Array Bracket Key Normalization
    // Group inputs ending in '[]' (e.g., tags[], roles[]) into deduplicated arrays
    var serializedArray = $form.serializeArray();
    var payload = {};

    for (var i = 0; i < serializedArray.length; i++) {
      var item = serializedArray[i];
      var name = item.name;
      var value = item.value;

      if (name.indexOf('[]') === name.length - 2) {
        var cleanKey = name.substring(0, name.length - 2);
        if (!payload[cleanKey]) {
          payload[cleanKey] = [];
        }
        // Deduplicate repeated selections
        if (payload[cleanKey].indexOf(value) === -1) {
          payload[cleanKey].push(value);
        }
      } else {
        payload[name] = value;
      }
    }

    // DEAD PATTERN: Synchronous async:false AJAX and deprecated $.Deferred.pipe()
    var targetUrl = $form.attr('action') || '/api/submit';
    var dfd = $.Deferred();

    $.ajax({
      url: targetUrl,
      type: 'POST',
      data: JSON.stringify(payload),
      contentType: 'application/json; charset=utf-8',
      async: false, // FREEZES UI THREAD
      success: function(response) {
        dfd.resolve(response);
      },
      error: function(xhr, status, err) {
        dfd.reject(err);
      }
    });

    // DEAD PATTERN: Deprecated .pipe() chaining
    dfd.pipe(function(data) {
      window.__POLTERGEIST_LOCK = false;
      $form.trigger('poltergeist:success', [data]);
    }, function(err) {
      window.__POLTERGEIST_LOCK = false;
      $form.trigger('poltergeist:error', [err]);
    });

    return false;
  });
})(jQuery);
`,
    known_symptoms: [
      "TypeError: $(...).live is not a function (Removed in jQuery 1.9+)",
      "DeprecationWarning: Synchronous XMLHttpRequest on the main thread is deprecated due to freezing the user interface",
      "DeprecationWarning: deferred.pipe() is deprecated since jQuery 1.8; use deferred.then()",
      "Window pollution anti-pattern: window.__POLTERGEIST_LOCK causes race conditions across multi-tab workflows",
    ],
    expected_soul_invariants: {
      bracket_key_array_deduplication: {
        invariant: "Multi-Select Bracket Key Normalization",
        description:
          "Normalizes repeated inputs ending in '[]' into deduplicated arrays while retaining scalar values for standard keys",
      },
      cjk_ime_composition_lock: {
        invariant: "CJK / Asian IME Composition Keystroke Lock",
        description:
          "Locks form submission when Enter is pressed while IME character composition is active (isComposing or keyCode 229)",
      },
    },
    status: "IN_CRYPT",
  },

  //RELIC 3: py2-ledger-phantom.py
  {
    relic_code: "RELIC-2014-003",
    filename: "py2-ledger-phantom.py",
    original_author: "@carlos_fin_hack (Last commit: Oct 29, 2014)",
    abandoned_year: 2014,
    source_language: "Python 2.7",
    era_category: "Python 2.7 Financial & IO",
    backstory:
      "Penned in late 2014 by Carlos for a distributed Latin American commodities trading exchange, LedgerPhantom parsed millions of daily accounting entries from malformed bank CSV exports. It was famous for its precision rounding engine and resilient text handling. When Python 2 reached end-of-life on January 1, 2020, and the exchange merged with a multinational conglomerate, Carlos moved to rural Argentina to raise alpacas. The script continues running undead on forgotten legacy servers.",
    legacy_code: `#!/usr/bin/env python2
# -*- coding: latin-1 -*-
"""
LedgerPhantom v2.4.1 - Financial Settlement & Currency Parser
Author: @carlos_fin_hack
Abandoned: Oct 29, 2014
Runtime: Python 2.7
"""
import urllib2
import sys
import decimal

def fetch_and_reconcile(csv_url):
    # DEAD PATTERN: urllib2 removed in Python 3
    print "Connecting to ledger stream: " + csv_url
    req = urllib2.Request(csv_url, headers={'User-Agent': 'LedgerPhantom/2.4'})
    response = urllib2.urlopen(req)
    raw_lines = response.read().splitlines()

    total_net_cents = 0
    records = []

    # SOUL INVARIANT 2: UTF-8 BOM Stripping & Accounting Parentheses Negatives
    # Bank files frequently start with UTF-8 BOM \\xef\\xbb\\xbf or Latin-1 artifacts
    if len(raw_lines) > 0 and raw_lines[0].startswith('\\xef\\xbb\\xbf'):
        raw_lines[0] = raw_lines[0][3:]

    headers = [h.strip() for h in raw_lines[0].split(',')]

    # DEAD PATTERN: xrange() removed in Python 3
    for idx in xrange(1, len(raw_lines)):
        line = raw_lines[idx].strip()
        if not line:
            continue
        parts = line.split(',')
        row = dict(zip(headers, parts))

        # SOUL INVARIANT 2 (Cont.): Accounting Negative Parsing
        # Figures formatted as '(1,250.50)' must parse to -1250.50
        raw_amount = row.get('amount', '0').strip()
        is_negative = False
        if raw_amount.startswith('(') and raw_amount.endswith(')'):
            is_negative = True
            raw_amount = raw_amount[1:-1]
        
        raw_amount = raw_amount.replace('$', '').replace(',', '')
        parsed_amount = float(raw_amount)
        if is_negative:
            parsed_amount = -abs(parsed_amount)

        # DEAD PATTERN: Python 2 classic integer floor division silent truncation bug
        # In Python 2, 150 / 100 == 1 (integer), whereas Python 3 yields 1.5
        cents = int(parsed_amount * 100)
        dollars_floor = cents / 100

        # SOUL INVARIANT 1: IEEE 754 Banker's Rounding (Round-Half-to-Even) on Sub-Cent Tax
        # For exact .5 cent fractions, round to the nearest EVEN cent to prevent cumulative ledger drift!
        raw_tax_cents = (cents * 0.0825)
        floor_tax = int(raw_tax_cents)
        remainder = round(raw_tax_cents - floor_tax, 4)
        if abs(remainder - 0.5) < 0.0001:
            tax_cents = floor_tax if (floor_tax % 2 == 0) else (floor_tax + 1)
        else:
            tax_cents = int(round(raw_tax_cents))

        total_net_cents += (cents + tax_cents)
        records.append({
            'cents': cents,
            'tax_cents': tax_cents
        })

    # DEAD PATTERN: Python 2 print statement without parentheses and dict.iteritems()
    print "Reconciled %d records. Total net cents: %d" % (len(records), total_net_cents)
    summary = {'total': total_net_cents, 'count': len(records)}
    for k, v in summary.iteritems():
        print "Summary ->", k, ":", v

    return records
`,
    known_symptoms: [
      "SyntaxError: Missing parentheses in call to print (Python 3 incompatibility)",
      "ModuleNotFoundError: No module named urllib2 (Python 3 urllib.request migration required)",
      "AttributeError: dict object has no attribute iteritems (Replaced by dict.items() in Python 3)",
      "NameError: name xrange is not defined (Replaced by range in Python 3)",
      "Silent data corruption: Integer division 'cents / 100' yields float in Python 3 vs int in Python 2",
    ],
    expected_soul_invariants: {
      bankers_half_to_even_rounding: {
        invariant: "IEEE 754 Banker's Rounding (Round-Half-to-Even)",
        description:
          "Sub-cent fractions ending in exactly .5 round to the nearest even integer to prevent systematic cumulative bias",
      },
      bom_and_accounting_parentheses_parsing: {
        invariant: "UTF-8 BOM Stripping & Accounting Parentheses Negatives",
        description:
          "Strips leading UTF-8 BOM bytes (\\xef\\xbb\\xbf) from CSV headers and parses '(1,250.50)' into negative floats",
      },
    },
    status: "IN_CRYPT",
  },
];
