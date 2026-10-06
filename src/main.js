window.showKasNotification = function showKasNotification(title, message, type = 'success') {
  document.querySelector('.kas-notification')?.remove()

  const notification = document.createElement('div')
  notification.className = `kas-notification ${type}`

  const titleElement = document.createElement('div')
  titleElement.className = 'kas-notification-title'
  titleElement.textContent = title

  const messageElement = document.createElement('div')
  messageElement.className = 'kas-notification-message'
  messageElement.textContent = message

  const closeButton = document.createElement('button')
  closeButton.className = 'kas-notification-close'
  closeButton.textContent = '\u00D7'
  closeButton.onclick = () => notification.remove()

  notification.append(titleElement, messageElement, closeButton)
  document.body.appendChild(notification)

  requestAnimationFrame(() => {
    notification.classList.add('show')
  })

  setTimeout(() => {
    notification.classList.remove('show')
    setTimeout(() => notification.remove(), 250)
  }, 6000)
}
import './style.css'
import {
  payToScriptHashScript,
  addressFromScriptPublicKey
} from './rpc-test.js'

document.querySelector('#app').innerHTML = `
  <main class="app kas-logic-app">

    <nav class="main-nav">
      <button class="brand nav-link" data-view="home">
        <div class="logo"><img src="/kaspa-logo.svg" alt="Kaspa"></div>
        <span>KAS Logic</span>
      </button>

      <div class="nav-center">
        <button class="nav-link active" data-view="home">Home</button>
        <button class="nav-link" data-view="learn">How It Works</button>
        <button class="nav-link" data-view="time">Time Vault</button>
        <button class="nav-link" data-view="secret">Secret Vault</button>
        <button class="nav-link" data-view="vaults">My Vaults</button>
        <button class="nav-link" data-view="faq">FAQ</button>
      </div>

      <div class="network">
        <span class="dot"></span>
        Testnet 10
      </div>
    </nav>

    <section id="view-home" class="app-view active">

      <section class="v4-hero">
        <div class="v4-hero-copy">
          <div class="eyebrow">KAS LOGIC // COVENANT PROTOCOL</div>

          <h1>
            Make KAS<br>
            <span>programmable.</span>
          </h1>

          <p class="v4-lead">
            Create KAS outputs with conditions enforced by Kaspa.
            Lock by time, unlock with a secret, and build new ways
            to control how KAS can be spent.
          </p>

          <div class="trust-row">
            <span>TESTNET-10</span>
            <span>KASWARE REQUIRED</span>
            <span>NON-CUSTODIAL</span>
          </div>
        </div>

        <div class="covenant-visual">
          <div class="visual-label">COVENANT FLOW</div>

          <div class="flow-node">
            <span>01</span>
            <div>
              <strong>Define</strong>
              <small>Choose the spending condition</small>
            </div>
          </div>

          <div class="flow-line"></div>

          <div class="flow-node">
            <span>02</span>
            <div>
              <strong>Fund</strong>
              <small>Send KAS to the covenant output</small>
            </div>
          </div>

          <div class="flow-line"></div>

          <div class="flow-node active">
            <span>03</span>
            <div>
              <strong>Enforce</strong>
              <small>Kaspa validates the condition</small>
            </div>
          </div>

          <div class="visual-result">
            KAS moves only when the covenant rules are satisfied.
          </div>
        </div>
      </section>


      <section class="explore-section">
        <div class="section-heading">
          <div>
            <span>LIVE // TESTNET-10</span>
            <h2>Live Covenants</h2>
          </div>

          <p>
            Time and secret-based spending conditions, available on Testnet-10.
          </p>
        </div>

        <div class="covenant-options">

          <button class="covenant-option" data-open-view="time">
            <div class="option-top">
              <span class="option-number">01</span>
              <span class="option-status">LIVE</span>
            </div>

            <div class="option-type">01 // TIME COVENANT // ACTIVE</div>

            <h3>Time Vault</h3>

            <p class="option-description">
              Lock KAS until a chosen point in time. The funds cannot
              be redeemed before the time condition has been satisfied.
            </p>

            <div class="condition-box">
              <span>CONDITION</span>
              <code>TIME + OWNER &rarr; SPEND</code>
            </div>

            <div class="use-cases">
              <span>USE CASES</span>
              <p>Delayed access &middot; Savings locks &middot; Scheduled funds</p>
            </div>

            <div class="option-link">
              Create Time Vault &rarr;
            </div>
          </button>


          <button class="covenant-option" data-open-view="secret">
            <div class="option-top">
              <span class="option-number">02</span>
              <span class="option-status">LIVE</span>
            </div>

            <div class="option-type">02 // HASHLOCK COVENANT // ACTIVE</div>

            <h3>Secret Vault</h3>

            <p class="option-description">
              Protect KAS with a secret. Anyone who provides the correct
              secret can satisfy the covenant and choose the destination.
            </p>

            <div class="condition-box">
              <span>CONDITION</span>
              <code>SECRET &rarr; PROOF &rarr; CLAIM</code>
            </div>

            <div class="use-cases">
              <span>USE CASES</span>
              <p>Secret transfers &middot; Conditional claims &middot; Experiments</p>
            </div>

            <div class="option-link">
              Create Secret Vault &rarr;
            </div>
          </button>

        </div>
      </section>


      <section class="home-how">
        <div class="section-heading">
          <div>
            <span>THE MODEL</span>
            <h2>Conditions, not custody.</h2>
          </div>
        </div>

        <div class="how-grid">
          <div>
            <span>01</span>
            <strong>You define the rule</strong>
            <p>
              Choose what must be true before the KAS can move.
            </p>
          </div>

          <div>
            <span>02</span>
            <strong>The covenant holds the condition</strong>
            <p>
              Your KAS is committed to an output governed by that rule.
            </p>
          </div>

          <div>
            <span>03</span>
            <strong>Kaspa enforces it</strong>
            <p>
              A spend is accepted only when the covenant condition is satisfied.
            </p>
          </div>
        </div>

        <button class="learn-link nav-link" data-view="learn">
          Learn how KAS Logic works &rarr;
        </button>
      </section>


      <section class="future-section">

  <div class="lab-heading">
    <div>
      <span class="lab-kicker">COVENANT LAB</span>
      <h2>More conditions.<br>More possibilities.</h2>
    </div>

    <div class="lab-stat">
      <strong>2</strong>
      <span>LIVE COVENANTS</span>
    </div>
  </div>

  <p class="lab-intro">
    Time and secrets are only the beginning. KAS Logic is designed
    as a growing interface for covenant-based applications on Kaspa.
  </p>

  <div class="lab-grid">

    <article class="lab-card featured">
      <div class="lab-card-top">
        <span>SECRET + OWNER</span>
        <b>COMING NEXT</b>
      </div>
      <h3>Two conditions. One spend.</h3>
      <p>
        Require knowledge of the secret and authorization from
        the owner's key before KAS can move.
      </p>
      <code>SECRET + OWNER &rarr; SPEND</code>
    </article>

    <article class="lab-card">
      <div class="lab-card-top">
        <span>MULTISIG VAULT</span>
        <b>PLANNED</b>
      </div>
      <h3>Shared authorization.</h3>
      <p>
        Require multiple keys to approve a transaction before
        the covenant permits the KAS to move.
      </p>
      <code>M OF N KEYS &rarr; SPEND</code>
    </article>

    <article class="lab-card">
      <div class="lab-card-top">
        <span>TIME + MULTISIG</span>
        <b>PLANNED</b>
      </div>
      <h3>Time meets consensus.</h3>
      <p>
        Combine a time condition with approval from multiple
        participants.
      </p>
      <code>TIME + MULTISIG &rarr; SPEND</code>
    </article>

    <article class="lab-card">
      <div class="lab-card-top">
        <span>RECOVERY / INHERITANCE</span>
        <b>RESEARCH</b>
      </div>
      <h3>A second path later.</h3>
      <p>
        Explore alternate recovery paths that become available
        after predefined conditions.
      </p>
      <code>PRIMARY OR RECOVERY PATH</code>
    </article>

    <article class="lab-card">
      <div class="lab-card-top">
        <span>ESCROW</span>
        <b>RESEARCH</b>
      </div>
      <h3>Conditional settlement.</h3>
      <p>
        Explore covenant paths for releasing funds according
        to predefined settlement rules.
      </p>
      <code>CONDITION &rarr; RELEASE</code>
    </article>

    <article class="lab-card">
      <div class="lab-card-top">
        <span>SPENDING CONTROLS</span>
        <b>EXPERIMENTAL</b>
      </div>
      <h3>Rules for how KAS moves.</h3>
      <p>
        Explore restrictions on spending behavior using the
        covenant primitives available on Kaspa.
      </p>
      <code>RULES &rarr; VALID SPEND</code>
    </article>

  </div>

  <p class="future-note">
    Lab concepts describe development directions, not currently
    available KAS Logic products.
  </p>

</section>

    </section>

    <section id="view-learn" class="app-view">

      <section class="hero compact-hero learn-hero">
        <div class="eyebrow">HOW IT WORKS</div>

        <h1>
          KAS with<br>
          <span>conditions.</span>
        </h1>

        <p>
          KAS Logic helps construct covenant-controlled outputs.
          The spending rules are enforced by Kaspa, not by KAS Logic.
        </p>
      </section>


      <section class="learn-block">
        <div class="learn-number">01</div>

        <div class="learn-content">
          <span class="learn-label">THE IDEA</span>
          <h2>What is a covenant?</h2>

          <p>
            A covenant places conditions on how KAS can be spent.
            Instead of only asking whether a transaction has a valid
            signature, additional rules can be evaluated before the
            network accepts the spend.
          </p>

          <div class="comparison-flow">
            <div>
              <span>STANDARD SPEND</span>
              <code>OWNER SIGNATURE &rarr; KAS</code>
            </div>

            <div>
              <span>TIME VAULT</span>
              <code>TIME + OWNER &rarr; KAS</code>
            </div>

            <div>
              <span>SECRET VAULT</span>
              <code>SECRET &rarr; KAS</code>
            </div>
          </div>
        </div>
      </section>


      <section class="learn-block">
        <div class="learn-number">02</div>

        <div class="learn-content">
          <span class="learn-label">CUSTODY</span>
          <h2>Who controls the KAS?</h2>

          <p>
            KAS Logic does not take custody of the funds. When a vault
            is funded, the KAS is controlled by the covenant conditions.
            KAS Logic cannot simply move the KAS or override those rules.
          </p>

          <div class="learn-callout">
            <strong>Your KAS. Your conditions.</strong>
            <span>Kaspa decides whether the spending conditions are satisfied.</span>
          </div>
        </div>
      </section>


      <section class="learn-block">
        <div class="learn-number">03</div>

        <div class="learn-content">
          <span class="learn-label">KAS LOGIC</span>
          <h2>What does this interface do?</h2>

          <p>
            KAS Logic helps you construct the covenant, fund its address,
            build valid redemption transactions, and keep useful recovery
            information.
          </p>

          <p>
            The interface is a tool around the covenant. It is not the
            authority that decides whether your KAS may be spent.
          </p>
        </div>
      </section>


      <section class="learn-block">
        <div class="learn-number">04</div>

        <div class="learn-content">
          <span class="learn-label">LOCAL STORAGE</span>
          <h2>How are my vaults remembered?</h2>

          <p>
            KAS Logic keeps vault information locally in your browser so
            you can return to vaults created or imported on this device.
          </p>

          <p>
            Your KAS and covenant remain on Kaspa. Keep your Recovery File
            safe in case browser data is cleared or you use another device.
          </p>
        </div>
      </section>


      <section class="learn-block recovery-guide">
        <div class="learn-number">05</div>

        <div class="learn-content">
          <span class="learn-label">RECOVERY</span>
          <h2>What if KAS Logic disappears?</h2>

          <p class="recovery-intro">
            Your vault lives on Kaspa, not on this website.
            Keep your Recovery File and the information required
            to satisfy your covenant.
          </p>

          <div class="recovery-grid">

            <div class="recovery-card">
              <div class="recovery-card-head">
                <span>TIME VAULT</span>
                <code>RECOVERY FILE + OWNER WALLET</code>
              </div>

              <div class="recovery-step"><b>01</b><p>Download and safely keep the Recovery File.</p></div>
              <div class="recovery-step"><b>02</b><p>Keep access to the owner wallet used for the vault.</p></div>
              <div class="recovery-step"><b>03</b><p>Wait until the time-lock condition has been reached.</p></div>
              <div class="recovery-step"><b>04</b><p>Reconstruct the vault and redeem with the owner wallet.</p></div>
            </div>

            <div class="recovery-card">
              <div class="recovery-card-head">
                <span>SECRET VAULT</span>
                <code>RECOVERY FILE + SECRET</code>
              </div>

              <div class="recovery-step"><b>01</b><p>Download and safely keep the Recovery File.</p></div>
              <div class="recovery-step"><b>02</b><p>Keep the original secret separately from the Recovery File.</p></div>
              <div class="recovery-step"><b>03</b><p>Reconstruct the vault using the Recovery File.</p></div>
              <div class="recovery-step"><b>04</b><p>Provide the original secret and redeem the KAS.</p></div>
            </div>

          </div>

          <div class="recovery-flow">
            <span>WEBSITE UNAVAILABLE?</span>
            <code>RECOVERY FILE &rarr; RECONSTRUCT COVENANT &rarr; SATISFY CONDITION &rarr; SPEND KAS</code>
          </div>

          <div class="recovery-important">
            <strong>Don't lose your Secret</strong>
            <span>
              A Secret Vault Recovery File does not contain your plaintext secret.
              Keep the secret separately. Without it, the Secret Vault cannot be redeemed.
            </span>
          </div>
        </div>
      </section>


      <section class="learn-warning">
        <span>SECRET VAULT NOTE</span>

        <p>
          A Secret Vault uses knowledge of the secret as authorization.
          The secret is revealed when it is used for redemption, so it
          should not be treated as permanently private after spending.
        </p>
      </section>

    </section>
    <section id="view-time" class="app-view">

      <div class="tool-layout">

        <div class="tool-intro">

          <div class="eyebrow">01 // LIVE COVENANT // TIME<br><small>TESTNET-10 // KASWARE REQUIRED</small></div>

          <h1>TIME<br><span>VAULT.</span></h1>

          <p class="tool-lead">
            Lock KAS against time. The owner spending path becomes valid only after the temporal condition is satisfied.
          </p>

          <div class="tool-condition">
            <span>SPENDING CONDITION</span>
            <code>TIME + OWNER &rarr; SPEND</code>
          </div>

          </div>

        <section class="vault-card tool-action-card">

          <div class="card-header">
            <div>
              <span class="step">CREATE</span>
              <h2>Time Vault</h2>
            </div>
            <div class="lock">TIME LOCK</div>
          </div>

          <p class="tool-card-description">
            Configure the amount and unlock condition.
          </p>

          <label>Amount</label>

          <div class="input-box">
            <input id="amount" type="number" placeholder="0.00">
            <span>KAS</span>
          </div>

          <label>Unlock after</label>

          <div class="time-options">
            <button data-time="10m">10 min</button>
            <button data-time="1h">1 hour</button>
            <button data-time="1d">1 day</button>
            <button data-time="custom">Custom</button>
          </div>

          <div id="customDuration" class="custom-duration" hidden>

            <label>Custom duration</label>

            <div class="custom-duration-row">
              <input
                id="customValue"
                type="number"
                min="0.01"
                step="any"
                placeholder="1"
              >

              <select id="customUnit">
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="years">Years</option>
              </select>
            </div>

            <small id="customEstimate">Enter a duration</small>

          </div>

          <div class="info">
            <div>
              <span>Unlock DAA</span>
              <strong id="unlockDaa">Select a time</strong>
            </div>
          </div>

          <button class="create" id="createVault">
            Create Time Vault
          </button>

          <p class="notice">
            Kaspa enforces the lock. KAS Logic does not take custody of the funds.
          </p>

        </section>

      </div>

      <section class="protocol-how protocol-how-time"><div class="protocol-how-head"><span>01 // PROTOCOL FLOW</span><h2>How Time Vault works.</h2><code>DEFINE &rarr; FUND &rarr; WAIT &rarr; SPEND</code></div><div class="protocol-how-grid"><div><b>001</b><strong>DEFINE</strong><p>Choose how long the KAS remains locked.</p></div><div><b>002</b><strong>FUND</strong><p>Commit KAS to the generated covenant output.</p></div><div><b>003</b><strong>WAIT</strong><p>Wait until the time condition has been reached.</p></div><div><b>004</b><strong>SPEND</strong><p>The owner can redeem after the condition is satisfied.</p></div></div></section><section id="timeVaultHistory" class="my-vaults" hidden>
        <div class="my-vaults-title">CREATED TIME VAULTS</div>
        <div id="timeVaultList"></div>
      </section>

    </section>
    <section id="view-secret" class="app-view">

      <div class="secret-tool-layout">

        <div class="secret-tool-intro">

          <div class="eyebrow">02 // LIVE COVENANT // HASHLOCK<br><small>TESTNET-10 // KASWARE REQUIRED</small></div>

          <h1>SECRET<br><span>VAULT.</span></h1>

          <p class="tool-lead">
            Lock KAS behind a secret. Anyone who knows the correct secret
            can satisfy the covenant and choose the destination.
          </p>

          <div class="tool-condition">
            <span>SPENDING CONDITION</span>
            <code>SECRET &rarr; SPEND</code>
          </div>

          <div class="secret-security-note">
            <span>IMPORTANT</span>
            <p>
              The secret is the authorization. It is revealed when the vault
              is redeemed, so do not reuse it.
            </p>
          </div>

        </div>


        <div class="secret-actions">

          <section class="vault-card secret-create-card">

            <div class="card-header">
              <div>
                <span class="step">CREATE</span>
                <h2>Secret Vault</h2>
              </div>

              <div class="lock">HASHLOCK</div>
            </div>

            <p class="tool-card-description">
              Create a new covenant protected by a secret.
            </p>

            <label>Amount</label>

            <div class="input-box">
              <input
                id="secretAmount"
                type="number"
                min="0"
                step="any"
                placeholder="0.00"
              >
              <span>KAS</span>
            </div>

            <label>Secret</label>

            <div class="input-box">
              <input
                id="secretValue"
                type="password"
                placeholder="Enter a secret"
              >
            </div>

            <label>Confirm secret</label>

            <div class="input-box">
              <input
                id="secretConfirm"
                type="password"
                placeholder="Confirm your secret"
              >
            </div>

            <button class="create" id="createSecretVault">
              Create Secret Vault
            </button>

          </section>


          <section class="vault-card secret-redeem-card">

            <div class="card-header">
              <div>
                <span class="step">REDEEM</span>
                <h2>Unlock Vault</h2>
              </div>
            </div>

            <p class="tool-card-description">
              Provide the secret and choose where the KAS should go.
            </p>

            <label>Vault address</label>

            <div class="input-box">
              <input
                id="secretVaultAddress"
                type="text"
                placeholder="kaspatest:..."
              >
            </div>

            <label>Secret</label>

            <div class="input-box">
              <input
                id="redeemSecret"
                type="password"
                placeholder="Enter the secret"
              >
            </div>

            <label>Destination</label>

            <div class="input-box">
              <input
                id="secretDestination"
                type="text"
                placeholder="kaspatest:..."
              >
            </div>

            <button class="create" id="redeemSecretVault">
              Redeem Secret Vault
            </button>

          </section>


          <div class="secret-next">
            <div>
              <span>COMING NEXT</span>
              <strong>Secret + Owner</strong>
            </div>

            <code>SECRET + OWNER &rarr; SPEND</code>
          </div>

        </div>

      </div>

    </section>
    <section id="view-vaults" class="app-view">

      <div class="vault-dashboard">

        <header class="vault-dashboard-header">

          <div>
            <div class="eyebrow">MY VAULTS</div>
            <h1>Your programmable<br><span>KAS positions.</span></h1>

            <p>
              Find, verify and manage covenant positions associated
              with your wallet.
            </p>
          </div>

          <div class="dashboard-status">
            <span>NETWORK</span>
            <strong>Kaspa Testnet 10</strong>
            <small>ON-CHAIN VERIFICATION</small>
          </div>

        </header>


        <div class="vault-dashboard-tools">

          <section class="dashboard-tool">

            <div class="dashboard-tool-icon">01</div>

            <div class="dashboard-tool-copy">
              <span>WALLET</span>
              <h3>Connect your wallet</h3>

              <p>
                Connect KasWare to interact with vaults saved or restored
                on this device. Connecting does not authorize transactions.
              </p>
            </div>

            <button class="create" id="connectVaultWallet">
              Connect KasWare
            </button>

          </section>


          <section class="dashboard-tool">

            <div class="dashboard-tool-icon">02</div>

            <div class="dashboard-tool-copy">
              <span>RECOVERY</span>
              <h3>Restore a vault</h3>

              <p>
                Import a KAS Logic recovery file to restore vault
                information on this browser or another device.
              </p>
            </div>

            <input
              id="recoveryFile"
              type="file"
              accept=".json,application/json"
              hidden
            >

            <button class="create vault-import" id="importRecovery">
              Import Recovery
            </button>

          </section>

        </div>


        <div class="dashboard-divider">
          <span>VAULT POSITIONS</span>
          <small>Verified against Kaspa</small>
        </div>


        <div id="myVaults" class="my-vaults dashboard-vault-list" hidden>
          <div class="my-vaults-title">MY VAULTS</div>

          <div class="vault-filter-tabs">
            <button class="vault-filter active" data-vault-filter="active">ACTIVE</button>
            <button class="vault-filter" data-vault-filter="redeemed">REDEEMED</button>
          </div>

          <div class="vault-type-tabs">
            <button class="vault-type-filter active" data-vault-type="time">TIME VAULT</button>
            <button class="vault-type-filter" data-vault-type="secret">SECRET VAULT</button>
          </div>

          <div id="vaultList" class="vault-groups">

            <section class="vault-group vault-group-active">
              <div class="vault-group-heading">
                <div>
                </div>
              </div>

              <div id="activeTimeVaults" class="vault-group-list"></div>
            </section>


            <section class="vault-group vault-group-active">
              <div class="vault-group-heading">
                <div>
                </div>
              </div>

              <div id="activeSecretVaults" class="vault-group-list"></div>
            </section>


            <section class="vault-group vault-group-redeemed">
              <div class="vault-group-heading">
                <div>
                </div>
              </div>

              <div id="redeemedTimeVaults" class="vault-group-list"></div>
            </section>


            <section class="vault-group vault-group-redeemed">
              <div class="vault-group-heading">
                <div>
                </div>
              </div>

              <div id="redeemedSecretVaults" class="vault-group-list"></div>
            </section>

          </div>
        </div>


        <div class="dashboard-note">
          <span>TESTNET-10</span>

          <p>
            KAS Logic helps you interact with your vaults.
            The covenant conditions on Kaspa determine whether funds
            can be spent.
          </p>
        </div>

      </div>

    </section>
    <section id="view-faq" class="app-view">

      <section class="faq-hero">
        <div class="eyebrow">PROTOCOL FAQ</div>
        <h1>Questions.<br><span>Answered.</span></h1>
        <p>How KAS Logic, covenants, custody, recovery and the current Testnet environment work.</p>
        <div class="faq-status">
          <span>TESTNET-10</span>
          <span>KASWARE REQUIRED</span>
          <span>EXPERIMENTAL</span>
        </div>
      </section>

      <section class="faq-section">
        <div class="faq-category">01 // COVENANTS</div>

        <details class="faq-item">
          <summary>What is a covenant?</summary>
          <p>A covenant places conditions on how KAS can be spent. A transaction must satisfy those conditions before the network accepts the spend.</p>
        </details>

        <details class="faq-item">
          <summary>How is a KAS Logic vault created?</summary>
          <p>KAS Logic constructs the covenant and its spending condition, then helps fund the resulting covenant-controlled output using your connected wallet.</p>
        </details>

        <details class="faq-item">
          <summary>Who enforces the covenant?</summary>
          <p>Kaspa enforces the spending condition. KAS Logic helps construct and interact with the covenant, but it does not decide whether a spend is valid.</p>
        </details>
      </section>

      <section class="faq-section">
        <div class="faq-category">02 // SECURITY + CUSTODY</div>

        <details class="faq-item">
          <summary>Why is KAS Logic non-custodial?</summary>
          <p>KAS Logic does not take custody of the funds. Once funded, the KAS is controlled by the covenant conditions rather than by an account operated by KAS Logic.</p>
        </details>

        <details class="faq-item">
          <summary>Can KAS Logic move my KAS?</summary>
          <p>KAS Logic cannot simply override the covenant and move the KAS. A valid spend must satisfy the covenant conditions enforced by Kaspa.</p>
        </details>

        <details class="faq-item">
          <summary>What happens if the KAS Logic website disappears?</summary>
          <p>The vault remains on Kaspa. Keep your Recovery File and the information required to satisfy the covenant so the vault can be reconstructed and redeemed.</p>
        </details>
      </section>

      <section class="faq-section">
        <div class="faq-category">03 // TIME VAULT</div>

        <details class="faq-item">
          <summary>How does a Time Vault work?</summary>
          <p>A Time Vault locks KAS behind a time condition and an owner-controlled spending path. The owner can spend only after the required condition has been reached.</p>
        </details>

        <details class="faq-item">
          <summary>Can a Time Vault be unlocked early?</summary>
          <p>No. The owner cannot bypass the time condition through KAS Logic. The required covenant condition must be satisfied before the spend is valid.</p>
        </details>

        <details class="faq-item">
          <summary>What do I need to recover a Time Vault?</summary>
          <p>Keep the Recovery File and access to the owner wallet used for the vault. After the time condition is reached, they are used to reconstruct and redeem the vault.</p>
        </details>
      </section>

      <section class="faq-section">
        <div class="faq-category">04 // SECRET VAULT</div>

        <details class="faq-item">
          <summary>How does a Secret Vault work?</summary>
          <p>KAS is locked behind the hash of a secret. Providing the matching secret satisfies the hashlock and allows a valid redemption transaction to choose the destination.</p>
        </details>

        <details class="faq-item">
          <summary>Does the Recovery File contain my secret?</summary>
          <p>No. The Secret Vault Recovery File does not contain the plaintext secret. Keep the original secret separately and securely.</p>
        </details>

        <details class="faq-item">
          <summary>Does the secret remain private after redemption?</summary>
          <p>No. The secret is revealed when it is used for redemption. It should not be reused or treated as permanently private after the vault is spent.</p>
        </details>
      </section>

      <section class="faq-section">
        <div class="faq-category">05 // WALLET + NETWORK</div>

        <details class="faq-item">
          <summary>Which wallet does KAS Logic currently support?</summary>
          <p>The current interface requires KasWare for wallet interaction.</p>
        </details>

        <details class="faq-item">
          <summary>Which network does KAS Logic use?</summary>
          <p>KAS Logic currently runs on Kaspa Testnet-10. The current interface is not intended for mainnet KAS.</p>
        </details>

        <details class="faq-item">
          <summary>Where is my vault information stored?</summary>
          <p>KAS Logic keeps useful vault information locally in your browser. The KAS and covenant themselves remain on Kaspa. Keep your Recovery File in case local browser data is cleared or you move to another device.</p>
        </details>
      </section>

      <section class="faq-section faq-risk">
        <div class="faq-category">06 // STATUS + RISK</div>

        <details class="faq-item">
          <summary>Is KAS Logic production-ready?</summary>
          <p>No. KAS Logic is currently experimental Testnet software.</p>
        </details>

        <details class="faq-item">
          <summary>Has KAS Logic been audited?</summary>
          <p>No independent security audit is currently claimed. Use the project as experimental Testnet software and do not treat it as audited production infrastructure.</p>
        </details>
      </section>

    </section>
  </main>
`

function switchView(view) {
  document.querySelectorAll('.app-view').forEach(section => {
    section.classList.toggle('active', section.id === `view-${view}`)
  })

  document.querySelectorAll('.nav-center .nav-link').forEach(button => {
    button.classList.toggle('active', button.dataset.view === view)
  })
}

document.querySelectorAll('[data-view]').forEach(button => {
  button.addEventListener('click', () => switchView(button.dataset.view))
})

let currentVaultFilter = 'active'
let currentVaultType = 'time'

function applyVaultFilters() {
  document.querySelectorAll('.vault-filter').forEach(button => {
    button.classList.toggle(
      'active',
      button.dataset.vaultFilter === currentVaultFilter
    )
  })

  document.querySelectorAll('.vault-type-filter').forEach(button => {
    button.classList.toggle(
      'active',
      button.dataset.vaultType === currentVaultType
    )
  })

  document.querySelectorAll('.vault-group').forEach(group => {
    const correctStatus =
      group.classList.contains('vault-group-' + currentVaultFilter)

    const correctType =
      currentVaultType === 'time'
        ? group.querySelector('#activeTimeVaults, #redeemedTimeVaults') !== null
        : group.querySelector('#activeSecretVaults, #redeemedSecretVaults') !== null

    group.hidden = !(correctStatus && correctType)
  })
}

document.querySelectorAll('.vault-filter').forEach(button => {
  button.addEventListener('click', () => {
    currentVaultFilter = button.dataset.vaultFilter
    applyVaultFilters()
  })
})

document.querySelectorAll('.vault-type-filter').forEach(button => {
  button.addEventListener('click', () => {
    currentVaultType = button.dataset.vaultType
    applyVaultFilters()
  })
})

applyVaultFilters()

const connectVaultWallet = document.querySelector('#connectVaultWallet')

connectVaultWallet?.addEventListener('click', async () => {
  try {
    connectVaultWallet.disabled = true
    connectVaultWallet.textContent = 'Connecting...'

    if (!window.kasware) {
      throw new Error('KasWare wallet not detected')
    }

    if (!window.kaspaRpc) {
      throw new Error('Kaspa RPC is not ready yet')
    }

    const accounts = await window.kasware.requestAccounts()

    if (!accounts?.length) {
      throw new Error('No KasWare account connected')
    }

    const compressedPubkey = await window.kasware.getPublicKey()

    if (!compressedPubkey || compressedPubkey.length !== 66) {
      throw new Error('Invalid KasWare public key')
    }

    await discoverWalletVaults(accounts, compressedPubkey)
    await setupVaultUI()

    const address = accounts[0]
    connectVaultWallet.textContent =
      `Connected ${address.slice(0, 8)}...${address.slice(-6)}`

  } catch (error) {
    console.error('KasWare connection error:', error)
    connectVaultWallet.textContent = 'Connect KasWare'
    connectVaultWallet.disabled = false
  }
})


document.querySelectorAll('[data-open-view]').forEach(button => {
  button.addEventListener('click', () => switchView(button.dataset.openView))
})
/* =========================================================
   SECRET VAULT V1 - SECRET ONLY
   ========================================================= */

async function sha256Bytes(text) {
  const data = new TextEncoder().encode(text)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return new Uint8Array(hash)
}

function buildSecretVaultBytecode(secretHash) {
  if (!(secretHash instanceof Uint8Array) || secretHash.length !== 32) {
    throw new Error('Secret hash must be exactly 32 bytes')
  }

  return new Uint8Array([
    118,4,83,45,102,195,135,99,117,118,130,81,151,0,157,117,118,168,32,
    ...secretHash,
    135,105,117,81,103,106,104
  ])
}

document.querySelector('#createSecretVault')
  ?.addEventListener('click', async () => {
    const button = document.querySelector('#createSecretVault')

    try {
      button.disabled = true
      button.textContent = 'Creating...'

      const amount =
        Number(document.querySelector('#secretAmount').value)

      const secret =
        document.querySelector('#secretValue').value

      const confirm =
        document.querySelector('#secretConfirm').value

      if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error('Enter a valid KAS amount')
      }

      if (!secret) {
        throw new Error('Enter a secret')
      }

      if (secret !== confirm) {
        throw new Error('Secrets do not match')
      }

      if (!window.kasware) {
        throw new Error('KasWare is not available')
      }

      const accounts = await window.kasware.requestAccounts()

      if (!accounts?.length) {
        throw new Error('No KasWare account connected')
      }

      const compressedPubkey =
        await window.kasware.getPublicKey()

      if (!compressedPubkey || compressedPubkey.length !== 66) {
        throw new Error('Invalid KasWare public key')
      }

      const ownerPubkey =
        compressedPubkey.slice(2)

      const secretHash = await sha256Bytes(secret)

      const redeemScript =
        buildSecretVaultBytecode(secretHash)

      const scriptPublicKey =
        payToScriptHashScript(redeemScript)

      const vaultAddress =
        addressFromScriptPublicKey(
          scriptPublicKey,
          'testnet-10'
        ).toString()

      const sompi =
        BigInt(Math.round(amount * 100000000))

      const fundingResult =
        await window.kasware.sendKaspa(
          vaultAddress,
          Number(sompi)
        )

      let fundingTxid = null

      if (typeof fundingResult === 'string') {
        try {
          const parsedFunding = JSON.parse(fundingResult)

          fundingTxid =
            parsedFunding?.id ||
            parsedFunding?.txid ||
            parsedFunding?.transactionId ||
            fundingResult
        } catch {
          fundingTxid = fundingResult
        }
      } else {
        fundingTxid =
          fundingResult?.id ||
          fundingResult?.txid ||
          fundingResult?.transactionId ||
          null
      }

      const record = {
        type: 'secret-v1',
        version: 1,
        network: 'testnet-10',
        vaultAddress,
        amount: sompi.toString(),
        fundingTxid,
        secretHash: Array.from(secretHash)
          .map(b => b.toString(16).padStart(2, '0'))
          .join(''),
        redeemScriptHex: Array.from(redeemScript)
          .map(b => b.toString(16).padStart(2, '0'))
          .join(''),
        status: 'active'
      }

      const secretVaults = JSON.parse(
        localStorage.getItem('kasLogicSecretVaults') || '[]'
      )

      secretVaults.push(record)

      localStorage.setItem(
        'kasLogicSecretVaults',
        JSON.stringify(secretVaults)
      )

      document.querySelector('#secretAmount').value = ''
      document.querySelector('#secretValue').value = ''
      document.querySelector('#secretConfirm').value = ''
      document.querySelector('#secretVaultAddress').value = ''
      document.querySelector('#redeemSecret').value = ''
      document.querySelector('#secretDestination').value = ''
      window.selectedSecretFundingTxid = null

      if (DISCOVERY_ENABLED) try {
        await fetch('http://localhost:3001/vaults', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ownerPubkey,
            vaultAddress,
            amountSompi: sompi.toString(),
            fundingTxid,
            secretHash: record.secretHash,
            redeemScriptHex: record.redeemScriptHex,
            contract: 'secret-vault',
            contractVersion: 1,
            network: 'testnet-10'
          })
        })
      } catch (error) {
        console.warn('Secret Vault created successfully, but Discovery registration failed:', error)
      }

      await setupVaultUI()

      // Refresh again after RPC propagation
      setTimeout(() => {
        setupVaultUI().catch(error => {
          console.warn('Secret Vault delayed refresh failed:', error)
        })
      }, 2500)

      showKasNotification(
        'Secret Vault Created \u2713',
        `Vault: ${vaultAddress}\n\nFunding TX: ${fundingTxid || 'submitted'}`,
        'success'
      )

    } catch (error) {
      console.error('Secret Vault creation error:', error)

      showKasNotification(
        'Secret Vault Creation Failed',
        error?.message || String(error),
        'error'
      )
    } finally {
      button.disabled = false
      button.textContent = 'Create Secret Vault'
    }
  })
/* =========================================================
   SECRET VAULT V1 - REDEEM
   ========================================================= */

document.querySelector('#redeemSecretVault')
  ?.addEventListener('click', async () => {

    const button = document.querySelector('#redeemSecretVault')

    try {
      button.disabled = true
      button.textContent = 'Redeeming...'

      const vaultAddress =
        document.querySelector('#secretVaultAddress').value.trim()

      const secret =
        document.querySelector('#redeemSecret').value

      const destination =
        document.querySelector('#secretDestination').value.trim()

      if (!vaultAddress) {
        throw new Error('Enter the vault address')
      }

      if (!secret) {
        throw new Error('Enter the secret')
      }

      if (!destination) {
        throw new Error('Enter a destination address')
      }

      const secretHash = await sha256Bytes(secret)

      const redeemScript =
        buildSecretVaultBytecode(secretHash)

      const derivedAddress =
        addressFromScriptPublicKey(
          payToScriptHashScript(redeemScript),
          'testnet-10'
        ).toString()

      if (derivedAddress !== vaultAddress) {
        throw new Error(
          'Secret does not match this vault'
        )
      }

      const result =
        await window.kaspaRpc.getUtxosByAddresses([
          vaultAddress
        ])

      if (!result.entries?.length) {
        throw new Error(
          'No active UTXO found for this vault'
        )
      }

      let vaultUtxo = null

      const selectedFundingTxid =
        window.selectedSecretFundingTxid

      if (selectedFundingTxid) {
        let cleanFundingTxid = selectedFundingTxid

        if (
          typeof cleanFundingTxid === 'string' &&
          cleanFundingTxid.trim().startsWith('{')
        ) {
          try {
            cleanFundingTxid =
              JSON.parse(cleanFundingTxid).id
          } catch {}
        }

        vaultUtxo = result.entries.find(
          entry =>
            entry.outpoint?.transactionId === cleanFundingTxid
        )
      }

      if (!vaultUtxo) {
        throw new Error(
          'Could not find the specific funding UTXO for this Secret Vault'
        )
      }

      const fee = 1000000n
      const amount = BigInt(vaultUtxo.amount)

      if (amount <= fee) {
        throw new Error('Vault amount is too small')
      }

      const output =
        new window.TransactionOutput(
          amount - fee,
          window.payToAddressScript(destination)
        )

      const secretBytes =
        new TextEncoder().encode(secret)

      if (secretBytes.length > 75) {
        throw new Error(
          'Secret is too long for Secret Vault V1'
        )
      }

      const actionScript =
        new Uint8Array([
          secretBytes.length,
          ...secretBytes,
          0x04,
          0x53,
          0x2d,
          0x66,
          0xc3
        ])

      const signatureScript =
        window.payToScriptHashSignatureScript(
          redeemScript,
          actionScript
        )

      const input =
        new window.TransactionInput({
          previousOutpoint: vaultUtxo.outpoint,
          signatureScript,
          sequence: 0n,
          sigOpCount: 0,
          computeBudget: 10,
          utxo: vaultUtxo
        })

      const tx =
        new window.Transaction({
          version: 1,
          inputs: [input],
          outputs: [output],
          lockTime: 0n,
          subnetworkId:
            '0000000000000000000000000000000000000000',
          gas: 0n,
          payload: ''
        })

      tx.finalize()

      const submitted =
        await window.kaspaRpc.submitTransaction({
          transaction: tx,
          allowOrphan: false
        })

      const txid =
        submitted?.transactionId ||
        submitted?.txid ||
        tx.id

      const savedSecretVaults = JSON.parse(
        localStorage.getItem('kasLogicSecretVaults') || '[]'
      )

      const spentFundingTxid =
        vaultUtxo.outpoint?.transactionId

      const savedIndex = savedSecretVaults.findIndex(
        vault => {
          let fundingTxid = vault.fundingTxid

          if (
            typeof fundingTxid === 'string' &&
            fundingTxid.trim().startsWith('{')
          ) {
            try {
              fundingTxid = JSON.parse(fundingTxid).id
            } catch {}
          }

          return (
            vault.vaultAddress === vaultAddress &&
            fundingTxid === spentFundingTxid
          )
        }
      )

      if (savedIndex !== -1) {
        savedSecretVaults[savedIndex].status = 'redeemed'
        savedSecretVaults[savedIndex].redeemTxid = txid

        localStorage.setItem(
          'kasLogicSecretVaults',
          JSON.stringify(savedSecretVaults)
        )
      }

      showKasNotification(
        'Secret Vault Redeemed \u2713',
        `Transaction: ${txid}`,
        'success'
      )

      document.querySelector('#secretVaultAddress').value = ''
      document.querySelector('#redeemSecret').value = ''
      document.querySelector('#secretDestination').value = ''
      window.selectedSecretFundingTxid = null

      await setupVaultUI()

    } catch (error) {
      console.error(
        'Secret Vault redemption error:',
        error
      )

      showKasNotification(
        'Secret Vault Redemption Failed',
        error?.message || String(error),
        'error'
      )

    } finally {
      button.disabled = false
      button.textContent = 'Redeem Secret Vault'
    }
  })

const timeButtons = document.querySelectorAll('.time-options button')

timeButtons.forEach(button => {
  button.addEventListener('click', () => {
    timeButtons.forEach(btn => btn.classList.remove('active'))
    button.classList.add('active')
  })
})

let currentDaa = window.currentKaspaDaa ?? null

window.addEventListener('kaspa-daa-ready', async (event) => {
  currentDaa = event.detail

  const vaults = JSON.parse(
    localStorage.getItem('kasLogicVaults') || '[]'
  )

  const justUnlocked = vaults.some((vault, index) => {
    if (vault.status === 'redeemed') return false
    if (BigInt(currentDaa) < BigInt(vault.unlockDaa)) return false

    const status = document.querySelector(
      `[data-time-vault-index="${index}"] .vault-status-header strong`
    )

    return status?.textContent === 'LOCKED'
  })

  if (justUnlocked) {
    await setupVaultUI()
  }
})

let selectedUnlockDaa = null

const daaOffsets = {
  '10m': 6000,
  '1h': 36000,
  '1d': 864000
}

const customDuration = document.querySelector('#customDuration')
const customValue = document.querySelector('#customValue')
const customUnit = document.querySelector('#customUnit')
const customEstimate = document.querySelector('#customEstimate')

const customSeconds = {
  minutes: 60,
  hours: 3600,
  days: 86400,
  years: 31536000
}

function updateCustomUnlock() {
  const value = Number(customValue.value)
  const unit = customUnit.value

  if (
    currentDaa === null ||
    !Number.isFinite(value) ||
    value <= 0
  ) {
    selectedUnlockDaa = null
    document.querySelector('#unlockDaa').textContent = 'Select a time'
    customEstimate.textContent = 'Enter a duration'
    return
  }

  const daaOffset =
    Math.ceil(value * customSeconds[unit] * 10)

  selectedUnlockDaa = currentDaa + daaOffset

  document.querySelector('#unlockDaa').textContent =
    selectedUnlockDaa.toLocaleString()

  const unitLabel =
    value === 1 ? unit.slice(0, -1) : unit

  customEstimate.textContent =
    `Approximately ${value} ${unitLabel}`
}

timeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedTime = button.dataset.time

    if (window.currentKaspaDaa != null) {
      currentDaa = Number(window.currentKaspaDaa)
    }

    if (currentDaa === null) {
      showKasNotification('Connecting to Kaspa', 'Waiting for the Kaspa network connection.', 'error')
      return
    }

    if (selectedTime === 'custom') {
      customDuration.hidden = false
      updateCustomUnlock()
      return
    }

    customDuration.hidden = true

    if (daaOffsets[selectedTime]) {
      selectedUnlockDaa =
        currentDaa + daaOffsets[selectedTime]

      document.querySelector('#unlockDaa').textContent =
        selectedUnlockDaa.toLocaleString()
    }
  })
})

customValue.addEventListener('input', updateCustomUnlock)
customUnit.addEventListener('change', updateCustomUnlock)
document.querySelector('#createVault').addEventListener('click', async () => {
  try {
    const amount = document.querySelector('#amount').value

    if (!amount || Number(amount) <= 0) {
      showKasNotification('Invalid Amount', 'Please enter a valid KAS amount.', 'error')
      return
    }

    if (selectedUnlockDaa === null) {
      showKasNotification('Unlock Time Required', 'Please select an unlock time.', 'error')
      return
    }

    if (!window.kasware) {
      showKasNotification('KasWare Required', 'KasWare wallet was not detected.', 'error')
      return
    }

    const accounts = await window.kasware.requestAccounts()
    if (!accounts?.length) throw new Error('No KasWare account connected')

    const senderAddress = accounts[0]

    const compressedPubkey = await window.kasware.getPublicKey()
    if (!compressedPubkey || compressedPubkey.length !== 66) {
      throw new Error('Invalid KasWare public key')
    }

    const ownerPubkey = compressedPubkey.slice(2)
    const redeemScript = new Uint8Array(
      buildTimeVaultV2Bytecode(ownerPubkey, selectedUnlockDaa)
    )

    const scriptPublicKey = payToScriptHashScript(redeemScript)
    const vaultAddress =
      addressFromScriptPublicKey(scriptPublicKey, 'testnet-10').toString()

    const sompi = BigInt(
      Math.round(Number(amount) * 100_000_000)
    )

    const txResult = await window.kasware.sendKaspa(
      vaultAddress,
      Number(sompi)
    )

    let createTxid =
      txResult?.id ??
      txResult?.transactionId ??
      txResult?.txid ??
      null

    if (!createTxid && typeof txResult === 'string') {
      try {
        const parsedTx = JSON.parse(txResult)
        createTxid =
          parsedTx?.id ??
          parsedTx?.transactionId ??
          parsedTx?.txid ??
          null
      } catch {
        createTxid = txResult
      }
    }

    const vaults = JSON.parse(
      localStorage.getItem('kasLogicVaults') || '[]'
    )

    vaults.push({
      type: 'time-v2',
      version: 2,
      vaultAddress,
      senderAddress,
      ownerPubkey,
      amount: sompi.toString(),
      unlockDaa: String(selectedUnlockDaa),
      createTxid,
      redeemScriptHex: Array.from(redeemScript, b => b.toString(16).padStart(2, '0')).join(''),
      status: 'active'
    })

    localStorage.setItem(
      'kasLogicVaults',
      JSON.stringify(vaults)
    )

    const createdVault = vaults[vaults.length - 1]

    if (DISCOVERY_ENABLED) try {
      const discoveryResponse = await fetch(
        'http://localhost:3001/vaults',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ownerPubkey: createdVault.ownerPubkey,
            vaultAddress: createdVault.vaultAddress,
            unlockDaa: createdVault.unlockDaa,
            amountSompi: createdVault.amount,
            fundingTxid: createdVault.createTxid,
            redeemScriptHex: createdVault.redeemScriptHex,
            contract: 'time-vault',
            contractVersion: 2,
            network: 'testnet-10'
          })
        }
      )

      if (!discoveryResponse.ok) {
        throw new Error(
          `Discovery registration failed: ${discoveryResponse.status}`
        )
      }

      console.log(
        'KAS LOGIC VAULT REGISTERED WITH DISCOVERY:',
        createdVault.vaultAddress
      )
    } catch (error) {
      console.warn(
        'Vault created successfully, but Discovery registration failed:',
        error
      )
    }

    const button = document.querySelector('#createVault')
    button.textContent = 'Vault Created \u2713'
    button.disabled = true

    document.querySelector('#amount').value = ''
    document.querySelectorAll('.time-options button').forEach(b => b.classList.remove('selected'))
    document.querySelector('#customValue').value = ''
    document.querySelector('#customUnit').value = 'minutes'
    document.querySelector('#customDuration').hidden = true
    document.querySelector('#customEstimate').textContent = 'Enter a duration'
    document.querySelector('#unlockDaa').textContent = 'Select a time'
    selectedUnlockDaa = null

    showKasNotification(
      'Time Vault Created \u2713',
      `${amount} KAS locked\nUnlock DAA: ${createdVault.unlockDaa}\n\nTransaction: ${createTxid}`,
      'success'
    )

    await setupVaultUI()

    button.textContent = 'Create Time Vault'
    button.disabled = false

  } catch (error) {
    console.error('Create vault error:', error)
    showKasNotification(
      'Time Vault Creation Failed',
      error?.message || String(error),
      'error'
    )
  }
})

const importRecoveryButton = document.querySelector('#importRecovery')
const recoveryFileInput = document.querySelector('#recoveryFile')

importRecoveryButton.addEventListener('click', () => {
  recoveryFileInput.value = ''
  recoveryFileInput.click()
})

recoveryFileInput.addEventListener('change', async () => {
  try {
    const file = recoveryFileInput.files?.[0]
    if (!file) return

    const recovery = JSON.parse(await file.text())

    if (recovery.format !== 'kas-logic-recovery') {
      throw new Error('Not a KAS Logic recovery file')
    }

    if (Number(recovery.formatVersion) !== 1) {
      throw new Error('Unsupported recovery format version')
    }

    if (recovery.network !== 'testnet-10') {
      throw new Error('Recovery file is not for testnet-10')
    }

    if (recovery.contract === 'secret-vault') {
      if (Number(recovery.contractVersion) !== 1) {
        throw new Error('Unsupported Secret Vault version')
      }

      if (!/^kaspatest:[a-z0-9]+$/i.test(recovery.vaultAddress || '')) {
        throw new Error('Invalid vault address')
      }

      if (!/^[0-9a-f]{64}$/i.test(recovery.secretHash || '')) {
        throw new Error('Invalid secret hash')
      }

      if (!/^\d+$/.test(String(recovery.amountSompi || ''))) {
        throw new Error('Invalid vault amount')
      }

      if (!/^[0-9a-f]{64}$/i.test(recovery.fundingTxid || '')) {
        throw new Error('Invalid funding transaction ID')
      }

      if (!recovery.redeemScriptHex || !/^[0-9a-f]+$/i.test(recovery.redeemScriptHex) || recovery.redeemScriptHex.length % 2 !== 0) {
        throw new Error('Invalid redeem script')
      }

      const secretHashBytes = hexBytes(recovery.secretHash)
      const expectedScript = buildSecretVaultBytecode(secretHashBytes)
      const expectedHex = Array.from(expectedScript, b => b.toString(16).padStart(2, '0')).join('')

      if (expectedHex.toLowerCase() !== recovery.redeemScriptHex.toLowerCase()) {
        throw new Error('Recovery verification failed: secret hash does not match covenant script')
      }

      const redeemScript = hexBytes(recovery.redeemScriptHex)
      const scriptPublicKey = payToScriptHashScript(redeemScript)
      const derivedAddress = addressFromScriptPublicKey(scriptPublicKey, 'testnet-10').toString()

      if (derivedAddress !== recovery.vaultAddress) {
        throw new Error('Recovery verification failed: redeem script does not match vault address')
      }

      const utxos = await window.kaspaRpc.getUtxosByAddresses([recovery.vaultAddress])
      const fundingUtxo = utxos.entries?.find(entry => entry.outpoint?.transactionId === recovery.fundingTxid)

      if (!fundingUtxo) {
        throw new Error('The specific Secret Vault funding UTXO was not found. It may already have been redeemed.')
      }

      const secretVaults = JSON.parse(localStorage.getItem('kasLogicSecretVaults') || '[]')
      const exists = secretVaults.some(v => v.vaultAddress === recovery.vaultAddress && v.fundingTxid === recovery.fundingTxid)

      if (exists) {
        throw new Error('This Secret Vault is already in My Vaults')
      }

      secretVaults.push({
        type: 'secret-v1',
        version: 1,
        network: 'testnet-10',
        vaultAddress: recovery.vaultAddress,
        amount: String(recovery.amountSompi),
        fundingTxid: recovery.fundingTxid,
        secretHash: recovery.secretHash,
        redeemScriptHex: recovery.redeemScriptHex,
        status: 'active',
        recovered: true
      })

      localStorage.setItem('kasLogicSecretVaults', JSON.stringify(secretVaults))
      await setupVaultUI()
      showKasNotification('Secret Vault Restored ?', 'Your Secret Vault was successfully restored.', 'success')
      return
    }

    if (
      recovery.contract !== 'time-vault' ||
      Number(recovery.contractVersion) !== 2
    ) {
      throw new Error('Unsupported covenant type or version')
    }

    if (!/^kaspatest:[a-z0-9]+$/i.test(recovery.vaultAddress || '')) {
      throw new Error('Invalid vault address')
    }

    if (!/^[0-9a-f]{64}$/i.test(recovery.ownerPubkey || '')) {
      throw new Error('Invalid owner public key')
    }

    if (!/^\d+$/.test(String(recovery.unlockDaa || ''))) {
      throw new Error('Invalid unlock DAA')
    }

    if (!/^\d+$/.test(String(recovery.amountSompi || ''))) {
      throw new Error('Invalid vault amount')
    }

    if (!/^[0-9a-f]{64}$/i.test(recovery.fundingTxid || '')) {
      throw new Error('Invalid funding transaction ID')
    }

    if (
      !recovery.redeemScriptHex ||
      !/^[0-9a-f]+$/i.test(recovery.redeemScriptHex) ||
      recovery.redeemScriptHex.length % 2 !== 0
    ) {
      throw new Error('Invalid redeem script')
    }

    const expectedRedeemScript = new Uint8Array(
      buildTimeVaultV2Bytecode(
        recovery.ownerPubkey,
        String(recovery.unlockDaa)
      )
    )

    const expectedRedeemScriptHex = Array.from(
      expectedRedeemScript,
      b => b.toString(16).padStart(2, '0')
    ).join('')

    if (
      expectedRedeemScriptHex.toLowerCase() !==
      recovery.redeemScriptHex.toLowerCase()
    ) {
      throw new Error(
        'Recovery verification failed: covenant script does not match owner and unlock DAA'
      )
    }

    const redeemScript = hexBytes(recovery.redeemScriptHex)
    const scriptPublicKey = payToScriptHashScript(redeemScript)

    const derivedAddress =
      addressFromScriptPublicKey(scriptPublicKey, 'testnet-10').toString()

    if (derivedAddress !== recovery.vaultAddress) {
      throw new Error(
        'Recovery verification failed: redeem script does not match vault address'
      )
    }

    const utxos = await window.kaspaRpc.getUtxosByAddresses([
      recovery.vaultAddress
    ])

    if (!utxos.entries?.length) {
      throw new Error(
        'This vault has no active UTXO. It may already have been redeemed.'
      )
    }

    const vaults = JSON.parse(
      localStorage.getItem('kasLogicVaults') || '[]'
    )

    const exists = vaults.some(
      v => v.vaultAddress === recovery.vaultAddress
    )

    if (exists) {
      throw new Error('This vault is already in My Vaults')
    }

    vaults.push({
      type: 'time-v2',
      version: 2,
      vaultAddress: recovery.vaultAddress,
      senderAddress: null,
      ownerPubkey: recovery.ownerPubkey,
      amount: String(recovery.amountSompi),
      unlockDaa: String(recovery.unlockDaa),
      createTxid: recovery.fundingTxid,
      redeemScriptHex: recovery.redeemScriptHex,
      status: 'active',
      recovered: true
    })

    localStorage.setItem(
      'kasLogicVaults',
      JSON.stringify(vaults)
    )

    await setupVaultUI()

    showKasNotification('Time Vault Restored ?', 'Your Time Vault was successfully restored.', 'success')

  } catch (error) {
    console.error('Recovery import error:', error)
    showKasNotification('Recovery Import Failed', error?.message || String(error), 'error')
  }
})
function downloadSecretVaultRecovery(vault) {
  const recovery = {
    format: 'kas-logic-recovery',
    formatVersion: 1,
    network: 'testnet-10',
    contract: 'secret-vault',
    contractVersion: 1,
    vaultAddress: vault.vaultAddress,
    amountSompi: vault.amount,
    fundingTxid: vault.fundingTxid,
    secretHash: vault.secretHash,
    redeemScriptHex: vault.redeemScriptHex
  }

  const blob = new Blob(
    [JSON.stringify(recovery, null, 2)],
    { type: 'application/json' }
  )

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'kas-logic-secret-vault-recovery.json'
  link.click()
  URL.revokeObjectURL(url)
}

function downloadVaultRecovery(vault) {
  const recovery = {
    format: 'kas-logic-recovery',
    formatVersion: 1,
    network: 'testnet-10',
    contract: 'time-vault',
    contractVersion: 2,
    vaultAddress: vault.vaultAddress,
    ownerPubkey: vault.ownerPubkey,
    unlockDaa: vault.unlockDaa,
    amountSompi: vault.amount,
    fundingTxid: vault.createTxid,
    redeemScriptHex: vault.redeemScriptHex
  }

  const blob = new Blob(
    [JSON.stringify(recovery, null, 2)],
    { type: 'application/json' }
  )

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `kas-logic-time-vault-${vault.vaultAddress.slice(-8)}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
function hexBytes(hex) {
  if (hex.length % 2 !== 0) throw new Error('Invalid hex')
  return new Uint8Array(hex.match(/../g).map(x => parseInt(x, 16)))
}

function buildTimeVaultV2Bytecode(ownerPubkey, unlockDaa) {
  const daa = Number(unlockDaa)
  const owner = Array.from(hexBytes(ownerPubkey))

  if (owner.length !== 32) {
    throw new Error('Owner public key must be 32-byte x-only key')
  }

  const daaBytes = [
    daa & 0xff,
    (daa >>> 8) & 0xff,
    (daa >>> 16) & 0xff,
    (daa >>> 24) & 0xff
  ]

  return [
    118,4,104,71,39,48,135,99,117,118,130,1,65,157,117,4,
    ...daaBytes,
    118,0,5,0,136,82,106,116,165,105,176,118,32,
    ...owner,
    172,105,117,81,103,106,104
  ]
}

async function redeemTimeVault(vaultAddress, destinationAddress, unlockDaa, ownerPubkey) {
  if (!window.kaspaRpc) throw new Error('Kaspa RPC is not connected')
  if (!ownerPubkey) throw new Error('This is not a V2 owner-protected vault')

  const currentDaa = BigInt(window.currentKaspaDaa)

  if (currentDaa < BigInt(unlockDaa)) {
    throw new Error(`Vault is still locked. Current DAA: ${currentDaa}, unlock DAA: ${unlockDaa}`)
  }

  const connectedPubkey = await window.kasware.getPublicKey()
  const connectedOwner = connectedPubkey.slice(2)

  if (connectedOwner.toLowerCase() !== ownerPubkey.toLowerCase()) {
    throw new Error('Connected KasWare wallet is not the owner of this vault')
  }

  const utxos = await window.kaspaRpc.getUtxosByAddresses([vaultAddress])

  if (!utxos.entries?.length) {
    throw new Error('No vault UTXO found')
  }

  const vaultUtxo = utxos.entries[0]

  const redeemScript = new Uint8Array(
    buildTimeVaultV2Bytecode(ownerPubkey, unlockDaa)
  )

  const fee = 1_000_000n
  const outputAmount = vaultUtxo.amount - fee

  if (outputAmount <= 0n) {
    throw new Error('Vault amount is too small to redeem')
  }

  const output = new window.TransactionOutput(
    outputAmount,
    window.payToAddressScript(destinationAddress)
  )

  const unsignedInput = new window.TransactionInput({
    previousOutpoint: vaultUtxo.outpoint,
    signatureScript: new Uint8Array(),
    sequence: 0n,
    sigOpCount: 0,
    computeBudget: 10,
    utxo: vaultUtxo
  })

  const unsignedTx = new window.Transaction({
    version: 1,
    inputs: [unsignedInput],
    outputs: [output],
    lockTime: BigInt(unlockDaa),
    subnetworkId: '0000000000000000000000000000000000000000',
    gas: 0n,
    payload: ''
  })

  unsignedTx.finalize()

  const signedJson = await window.kasware.signPskt({
    txJsonString: unsignedTx.serializeToSafeJSON(),
    options: {
      signInputs: [{ index: 0, sighashType: 1 }]
    }
  })

  const signed = JSON.parse(signedJson)
  const pushedSigHex = signed.inputs[0].signatureScript

  if (!pushedSigHex?.startsWith('41')) {
    throw new Error('Unexpected KasWare signature format')
  }

  const sigHex = pushedSigHex.slice(2)

  if (sigHex.length !== 130) {
    throw new Error('Expected 65-byte KasWare signature')
  }

  const ownerSig = hexBytes(sigHex)

  const actionScript = new Uint8Array([
    0x41, ...ownerSig,
    0x04, 0x68, 0x47, 0x27, 0x30
  ])

  const signatureScript =
    window.payToScriptHashSignatureScript(
      redeemScript,
      actionScript
    )

  const finalInput = new window.TransactionInput({
    previousOutpoint: vaultUtxo.outpoint,
    signatureScript,
    sequence: 0n,
    sigOpCount: 0,
    computeBudget: 10,
    utxo: vaultUtxo
  })

  const finalTx = new window.Transaction({
    version: 1,
    inputs: [finalInput],
    outputs: [output],
    lockTime: BigInt(unlockDaa),
    subnetworkId: '0000000000000000000000000000000000000000',
    gas: 0n,
    payload: ''
  })

  finalTx.finalize()

  const result = await window.kaspaRpc.submitTransaction({
    transaction: finalTx,
    allowOrphan: false
  })

  return result.transactionId
}
function migrateOldVault() {
  const old = localStorage.getItem('physicalKasTimeVault')
  if (!old) return

  try {
    const vault = JSON.parse(old)
    const vaults = JSON.parse(
      localStorage.getItem('kasLogicVaults') || '[]'
    )

    const exists = vaults.some(
      item => item.vaultAddress === vault.vaultAddress
    )

    if (!exists) {
      vaults.push({
        ...vault,
        type: 'time',
        status: 'active'
      })

      localStorage.setItem(
        'kasLogicVaults',
        JSON.stringify(vaults)
      )
    }

    localStorage.removeItem('physicalKasTimeVault')
  } catch (error) {
    console.error('Vault migration error:', error)
  }
}

const DISCOVERY_ENABLED = false

async function discoverWalletVaults(accounts, compressedPubkey) {
  if (!DISCOVERY_ENABLED) return []
  try {
    if (!window.kaspaRpc) return []
    if (!accounts?.length) return []
    if (!compressedPubkey || compressedPubkey.length !== 66) return []

    const ownerPubkey = compressedPubkey.slice(2)

    const response = await fetch(
      `http://localhost:3001/vaults/${ownerPubkey}`
    )

    if (!response.ok) {
      throw new Error(`Discovery server error: ${response.status}`)
    }

    const discovered = await response.json()

    const verified = []

    for (const vault of discovered) {
      try {
        if (
          vault.network !== 'testnet-10' ||
          !['time-vault', 'secret-vault'].includes(vault.contract) ||
          !((vault.contract === 'time-vault' && Number(vault.contractVersion) === 2) || (vault.contract === 'secret-vault' && Number(vault.contractVersion) === 1)) ||
          vault.ownerPubkey?.toLowerCase() !== ownerPubkey.toLowerCase()
        ) {
          continue
        }

        let expectedScript

        if (vault.contract === 'time-vault') {
          expectedScript = new Uint8Array(
            buildTimeVaultV2Bytecode(
              vault.ownerPubkey,
              String(vault.unlockDaa)
            )
          )
        } else {
          if (!/^[0-9a-fA-F]{64}$/.test(vault.secretHash || '')) {
            continue
          }

          const secretHash = new Uint8Array(
            vault.secretHash.match(/.{2}/g).map(byte => parseInt(byte, 16))
          )

          expectedScript = buildSecretVaultBytecode(secretHash)
        }

        const expectedHex = Array.from(
          expectedScript,
          b => b.toString(16).padStart(2, '0')
        ).join('')

        if (
          expectedHex.toLowerCase() !==
          vault.redeemScriptHex?.toLowerCase()
        ) {
          continue
        }

        const scriptPublicKey = payToScriptHashScript(expectedScript)

        const derivedAddress =
          addressFromScriptPublicKey(
            scriptPublicKey,
            'testnet-10'
          ).toString()

        if (derivedAddress !== vault.vaultAddress) {
          continue
        }

        const utxos =
          await window.kaspaRpc.getUtxosByAddresses([
            vault.vaultAddress
          ])

        const fundingUtxo = utxos.entries?.find(
          entry =>
            entry.outpoint?.transactionId === vault.fundingTxid
        )

        if (!fundingUtxo) {
          try {
            await fetch(
              `http://localhost:3001/vaults/${vault.vaultAddress}/spent`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  fundingTxid: vault.fundingTxid
                })
              }
            )

            console.log(
              'KAS LOGIC DISCOVERY MARKED SPENT:',
              vault.vaultAddress
            )
          } catch (error) {
            console.warn(
              'Could not mark Discovery vault as spent:',
              vault.vaultAddress,
              error
            )
          }

          continue
        }

        verified.push(vault)

      } catch (error) {
        console.warn(
          'Rejected discovered vault:',
          vault.vaultAddress,
          error
        )
      }
    }

    console.log('KAS LOGIC VERIFIED DISCOVERED VAULTS:', verified)

    const localVaults = JSON.parse(
      localStorage.getItem('kasLogicVaults') || '[]'
    )

    const localSecretVaults = JSON.parse(
      localStorage.getItem('kasLogicSecretVaults') || '[]'
    )

    let secretAdded = 0

    let added = 0

    for (const vault of verified) {
      if (vault.contract === 'time-vault') {
        const exists = localVaults.some(
          local => local.vaultAddress === vault.vaultAddress
        )

        if (!exists) {
          localVaults.push({
            type: 'time-v2',
            version: 2,
            vaultAddress: vault.vaultAddress,
            senderAddress: accounts[0],
            ownerPubkey: vault.ownerPubkey,
            amount: String(vault.amountSompi),
            unlockDaa: String(vault.unlockDaa),
            createTxid: vault.fundingTxid,
            redeemScriptHex: vault.redeemScriptHex,
            status: 'active',
            discovered: true
          })

          added++
        }
      }

      if (vault.contract === 'secret-vault') {
        const exists = localSecretVaults.some(
          local =>
            local.vaultAddress === vault.vaultAddress &&
            local.fundingTxid === vault.fundingTxid
        )

        if (!exists) {
          localSecretVaults.push({
            type: 'secret-v1',
            version: 1,
            network: 'testnet-10',
            vaultAddress: vault.vaultAddress,
            amount: String(vault.amountSompi),
            fundingTxid: vault.fundingTxid,
            secretHash: vault.secretHash,
            redeemScriptHex: vault.redeemScriptHex,
            status: 'active',
            discovered: true
          })

          secretAdded++
        }
      }
    }
    if (added > 0) {
      localStorage.setItem(
        'kasLogicVaults',
        JSON.stringify(localVaults)
      )

      console.log(
        `KAS LOGIC RESTORED ${added} VAULT(S) FROM DISCOVERY`
      )
    }

    if (secretAdded > 0) {
      localStorage.setItem(
        'kasLogicSecretVaults',
        JSON.stringify(localSecretVaults)
      )

      console.log(
        `KAS LOGIC RESTORED ${secretAdded} SECRET VAULT(S) FROM DISCOVERY`
      )
    }

    return verified
  } catch (error) {
    console.error('Vault discovery error:', error)
    return []
  }
}
window.discoverWalletVaults = discoverWalletVaults
function txExplorerLink(txid) {
  if (typeof txid !== 'string') return ''

  let cleanTxid = txid

  if (cleanTxid.trim().startsWith('{')) {
    try { cleanTxid = JSON.parse(cleanTxid).id } catch {}
  }

  if (!/^[0-9a-f]{64}$/i.test(cleanTxid)) return ''

  const shortTxid =
    cleanTxid.slice(0, 8) + '...' + cleanTxid.slice(-8)

  return `<a class="tx-explorer-link" href="https://tn10.kaspa.stream/transactions/${cleanTxid}" target="_blank" rel="noopener noreferrer"><code>${shortTxid}</code><span>View on-chain ?</span></a>`
}

async function setupVaultUI() {
  const renderId = Date.now() + '-' + Math.random().toString(16).slice(2,6)
  migrateOldVault()

  const container = document.querySelector('#myVaults')
  const list = document.querySelector('#vaultList')

  const activeTimeVaults = document.querySelector('#activeTimeVaults')
  const activeSecretVaults = document.querySelector('#activeSecretVaults')
  const redeemedTimeVaults = document.querySelector('#redeemedTimeVaults')
  const redeemedSecretVaults = document.querySelector('#redeemedSecretVaults')

  if (!container || !list) return

  const vaults = JSON.parse(
    localStorage.getItem('kasLogicVaults') || '[]'
  )

  const oldSecretVault = JSON.parse(
    localStorage.getItem('kasLogicSecretVault') || 'null'
  )

  let secretVaults = JSON.parse(
    localStorage.getItem('kasLogicSecretVaults') || '[]'
  )

  if (
    oldSecretVault &&
    !secretVaults.some(
      vault => vault.vaultAddress === oldSecretVault.vaultAddress
    )
  ) {
    secretVaults.push(oldSecretVault)

    localStorage.setItem(
      'kasLogicSecretVaults',
      JSON.stringify(secretVaults)
    )

    localStorage.removeItem('kasLogicSecretVault')
  }

  if (!vaults.length && !secretVaults.length) {
    container.hidden = true
    return
  }

  container.hidden = false
  if (activeTimeVaults) activeTimeVaults.innerHTML = ''
  if (activeSecretVaults) activeSecretVaults.innerHTML = ''
  if (redeemedTimeVaults) redeemedTimeVaults.innerHTML = ''
  if (redeemedSecretVaults) redeemedSecretVaults.innerHTML = ''
  const secretVaultHistory = document.querySelector('#secretVaultHistory')
  const secretVaultList = document.querySelector('#secretVaultList')
  const timeVaultHistory = document.querySelector('#timeVaultHistory')
  const timeVaultList = document.querySelector('#timeVaultList')
  if (timeVaultList) timeVaultList.innerHTML = ''
  if (secretVaultList) secretVaultList.innerHTML = ''

  const currentDaa = BigInt(window.currentKaspaDaa || 0)

  /* -------------------------
     TIME VAULTS
     ------------------------- */

  vaults.map((vault, index) => ({ vault, index })).reverse().forEach(({ vault, index }) => {
    const unlockDaa = BigInt(vault.unlockDaa)
    const redeemed = vault.status === 'redeemed'
    const ready = !redeemed && currentDaa >= unlockDaa

    const card = document.createElement('div')
    card.className = 'vault-status'
    card.dataset.timeVaultIndex = String(index)

    const stateText =
      redeemed ? 'REDEEMED' :
      ready ? 'READY' :
      'LOCKED'

    card.innerHTML = `
      <div class="vault-status-header">
        <span>TIME VAULT</span>
        <strong>${stateText}</strong>
      </div>

      <div class="vault-details">
        <div>
          <span>Amount</span>
          <strong>${Number(vault.amount) / 100000000} KAS</strong>
        </div>

        <div>
          <span>Unlock DAA</span>
          <strong>${Number(vault.unlockDaa).toLocaleString()}</strong>
        </div>
      </div>

      <div class="vault-address">
        <span>Vault address</span>
        <code>${vault.vaultAddress}</code>
      </div>

      ${vault.createTxid ? `
        <div class="vault-address">
          <span>Funding TX</span>
          ${txExplorerLink(vault.createTxid)}
        </div>
      ` : ''}

      ${redeemed && vault.redeemTxid ? `
        <div class="redeem-success">
          <strong>Vault redeemed successfully</strong>
          <span>${(Number(vault.amount) - 1000000) / 100000000} KAS returned to wallet</span>

          <div class="redeem-tx">
            <span>Redemption TX</span>
            ${txExplorerLink(vault.redeemTxid)}
          </div>
        </div>
      ` : ''}
    `

    if (vault.type === 'time-v2' && vault.redeemScriptHex) {
      const recoveryButton = document.createElement('button')
      recoveryButton.className = 'create recovery-download'
      recoveryButton.textContent = 'Download Recovery'

      recoveryButton.onclick = () => {
        downloadVaultRecovery(vault)
      }

      card.appendChild(recoveryButton)
    }

    if (ready) {
      const redeem = document.createElement('button')
      redeem.className = 'create'
      redeem.textContent = 'Redeem Vault'

      redeem.onclick = async () => {
        try {
          redeem.disabled = true
          redeem.textContent = 'Redeeming...'

          const accounts =
            await window.kasware.requestAccounts()

          if (!accounts?.length) {
            throw new Error('No KasWare account connected')
          }

          const txid = await redeemTimeVault(
            vault.vaultAddress,
            accounts[0],
            vault.unlockDaa,
            vault.ownerPubkey
          )

          vaults[index].status = 'redeemed'
          vaults[index].redeemTxid = txid

          localStorage.setItem(
            'kasLogicVaults',
            JSON.stringify(vaults)
          )

          await setupVaultUI()

        } catch (error) {
          console.error('Redeem error:', error)
          redeem.disabled = false
          redeem.textContent = 'Redeem Vault'

          showKasNotification(
            'Time Vault Redemption Failed',
            error?.message || String(error),
            'error'
          )
        }
      }

      card.appendChild(redeem)
    }

    const timeTarget = redeemed ? redeemedTimeVaults : activeTimeVaults
    if (timeTarget) timeTarget.appendChild(card)

    if (timeVaultList) {
      const timeCard = card.cloneNode(true)
      const originalButtons = card.querySelectorAll('button')
      const clonedButtons = timeCard.querySelectorAll('button')

      originalButtons.forEach((button, i) => {
        clonedButtons[i].onclick = button.onclick
      })

      timeVaultList.appendChild(timeCard)
    }
    if (timeVaultHistory) timeVaultHistory.hidden = false
  })

  /* -------------------------
     SECRET VAULT
     ------------------------- */

  for (const secretVault of [...secretVaults].reverse()) {
    const redeemed =
      secretVault.status === 'redeemed'

    let funded = redeemed

    if (!redeemed) {
      try {
        const result =
          await window.kaspaRpc.getUtxosByAddresses([
            secretVault.vaultAddress
          ])

        let fundingTxid = secretVault.fundingTxid

        if (
          typeof fundingTxid === 'string' &&
          fundingTxid.trim().startsWith('{')
        ) {
          try {
            fundingTxid = JSON.parse(fundingTxid).id
          } catch {}
        }

        funded = !!result.entries?.some(
          entry =>
            entry.outpoint?.transactionId === fundingTxid
        )
      } catch (error) {
        console.warn(
          'Could not verify Secret Vault funding:',
          secretVault.vaultAddress,
          error
        )

        funded = true
      }
    }

    const card =
      document.createElement('div')

    card.className = 'vault-status secret-vault-status'

    card.innerHTML = `
      <div class="vault-status-header">
        <span>SECRET VAULT</span>
        <strong>${redeemed ? 'REDEEMED' : 'ACTIVE'}</strong>
      </div>

      <div class="vault-details">
        <div>
          <span>Amount</span>
          <strong>${Number(secretVault.amount) / 100000000} KAS</strong>
        </div>

        <div>
          <span>Authorization</span>
          <strong>SECRET ONLY</strong>
        </div>
      </div>

      <div class="vault-address">
        <span>Vault address</span>
        <code>${secretVault.vaultAddress}</code>
      </div>

      ${secretVault.fundingTxid ? `
        <div class="vault-address">
          <span>Funding TX</span>
          ${txExplorerLink(secretVault.fundingTxid)}
        </div>
      ` : ''}

      ${redeemed && secretVault.redeemTxid ? `
        <div class="redeem-success">
          <strong>Secret Vault redeemed successfully</strong>
          <span>${(Number(secretVault.amount) - 1000000) / 100000000} KAS sent to destination</span>

          <div class="redeem-tx">
            <span>Redemption TX</span>
            ${txExplorerLink(secretVault.redeemTxid)}
          </div>
        </div>
      ` : ''}
    `

    if (secretVault.redeemScriptHex) {
      const recoveryButton = document.createElement('button')
      recoveryButton.className = 'create recovery-download'
      recoveryButton.textContent = 'Download Recovery'

      recoveryButton.onclick = () => {
        downloadSecretVaultRecovery(secretVault)
      }

      card.appendChild(recoveryButton)
    }

    if (!redeemed && funded) {
      const openButton =
        document.createElement('button')

      openButton.className = 'create'
      openButton.textContent = 'Open Secret Vault'

      openButton.onclick = () => {
        switchView('secret')

        document.querySelector(
          '#secretVaultAddress'
        ).value = secretVault.vaultAddress

        window.selectedSecretFundingTxid =
          secretVault.fundingTxid || null

        document.querySelector(
          '#redeemSecret'
        ).focus()
      }

      card.appendChild(openButton)
    }

    const secretTarget =
      secretVault.status === 'redeemed'
        ? redeemedSecretVaults
        : activeSecretVaults

    if (secretTarget) secretTarget.appendChild(card)

    if (secretVaultList) {
      const secretCard = card.cloneNode(true)
      const originalButtons = card.querySelectorAll('button')
      const clonedButtons = secretCard.querySelectorAll('button')

      clonedButtons.forEach(button => {
        if (button.textContent.trim() === 'Open Secret Vault') {
          button.onclick = () => {
            switchView('secret')
            document.querySelector('#secretVaultAddress').value = secretVault.vaultAddress
            window.selectedSecretFundingTxid = secretVault.fundingTxid || null
            document.querySelector('#redeemSecret').focus()
          }
        }
      })

      secretVaultList.appendChild(secretCard)
    }
    if (secretVaultHistory) secretVaultHistory.hidden = false
  }
}
async function startKasLogic() {
  await setupVaultUI()
}

window.addEventListener('kaspa-daa-ready', startKasLogic, { once: true })




































