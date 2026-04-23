/* =====================================================
   DevForge — main.js
   Terminal background + UI interactions
===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────────
     TERMINAL BACKGROUND
     Each line in each column has its OWN random delay
     and speed — so they all move differently.
  ────────────────────────────────────────────────── */

  const COLUMNS = [
    {
      id: 'tc0',
      title: 'AGENT-01 // BUILD',
      dot: 'on',
      lines: [
        { cls: 'prompt',  tx: '> devforge build --stack=react --prod'       },
        { cls: 'info',    tx: '[INIT] Resolving 142 packages...'             },
        { cls: '',        tx: '[BUILD] Compiling components  1/24'           },
        { cls: '',        tx: '[BUILD] Compiling components  8/24'           },
        { cls: '',        tx: '[BUILD] Compiling components 16/24'           },
        { cls: '',        tx: '[BUILD] Compiling components 24/24'           },
        { cls: 'success', tx: '[BUILD] Compilation complete — 3.2s'         },
        { cls: '',        tx: '[BUNDLE] Minifying JS... 412kb → 98kb'       },
        { cls: 'prompt',  tx: '> devforge test --coverage --watch=false'    },
        { cls: '',        tx: '[TEST] Running 47 test cases...'              },
        { cls: 'success', tx: '[TEST] 47/47 passed — coverage 94.2%'        },
        { cls: 'prompt',  tx: '> devforge deploy --env=production'          },
        { cls: 'info',    tx: '[DEPLOY] Uploading to CDN...'                },
        { cls: 'success', tx: '[DEPLOY] Live → yourapp.vercel.app'          },
        { cls: 'dim',     tx: '[LOG] Build time: 4.8s, size: 98kb'          },
      ]
    },
    {
      id: 'tc1',
      title: 'AGENT-02 // BACKEND',
      dot: 'on',
      lines: [
        { cls: 'prompt',  tx: '> devforge init --template=laravel-api'      },
        { cls: 'info',    tx: '[INIT] Creating project structure'            },
        { cls: '',        tx: '[SETUP] Installing composer dependencies'     },
        { cls: '',        tx: '[SETUP] Generating application key'          },
        { cls: 'success', tx: '[SETUP] Database migrated — 12 tables'       },
        { cls: 'prompt',  tx: '> php artisan serve --port=8000'             },
        { cls: 'info',    tx: '[SERVER] Starting development server'        },
        { cls: 'success', tx: '[SERVER] Running on localhost:8000'          },
        { cls: 'prompt',  tx: '> devforge api --resource=users --crud'      },
        { cls: '',        tx: '[API] Generating controllers...'              },
        { cls: 'success', tx: '[API] CRUD endpoints generated (6 routes)'   },
        { cls: '',        tx: '[API] Auth middleware applied'               },
        { cls: 'prompt',  tx: '> devforge optimize --prod --cache'          },
        { cls: 'success', tx: '[OPT] Response time: 42ms — score 98/100'   },
        { cls: 'dim',     tx: '[LOG] Queue worker started, 0 pending jobs'  },
      ]
    },
    {
      id: 'tc2',
      title: 'SYSTEM // MONITOR',
      dot: 'warn',
      lines: [
        { cls: 'prompt',  tx: '> python train.py --model=rf --epochs=50'    },
        { cls: 'info',    tx: '[ML] Loading dataset (12,543 rows)'          },
        { cls: '',        tx: '[ML] Preprocessing features...'              },
        { cls: '',        tx: '[ML] Feature engineering complete'           },
        { cls: '',        tx: '[ML] Training epoch 10/50 — loss: 0.412'    },
        { cls: '',        tx: '[ML] Training epoch 25/50 — loss: 0.218'    },
        { cls: '',        tx: '[ML] Training epoch 50/50 — loss: 0.089'    },
        { cls: 'success', tx: '[ML] Accuracy: 96.7% — F1 score: 0.94'      },
        { cls: 'prompt',  tx: '> python visualize.py --output=report'      },
        { cls: 'info',    tx: '[VIZ] Generating confusion matrix...'        },
        { cls: '',        tx: '[VIZ] Plotting ROC curve...'                 },
        { cls: 'success', tx: '[VIZ] Report saved → report_final.pdf'      },
        { cls: 'prompt',  tx: '> devforge export --format=pkl,notebook'    },
        { cls: 'success', tx: '[EXPORT] model_final.pkl — 2.3MB'           },
        { cls: 'dim',     tx: '[LOG] Model hash: a3f9d1... stored'          },
      ]
    },
    {
      id: 'tc3',
      title: 'AGENT-03 // DEBUG',
      dot: 'err',
      lines: [
        { cls: 'prompt',  tx: '> devforge debug --file=main.js --verbose'   },
        { cls: 'info',    tx: '[SCAN] Analyzing 847 lines of code...'       },
        { cls: 'error',   tx: '[ERR] TypeError: undefined is not iterable'  },
        { cls: '',        tx: '[TRACE] at line 142 — map() on null ref'     },
        { cls: 'info',    tx: '[FIX] Applying optional-chain guard...'      },
        { cls: 'success', tx: '[FIX] Error resolved — tests passing'        },
        { cls: 'prompt',  tx: '> devforge optimize --perf --bundle'         },
        { cls: 'info',    tx: '[PERF] Analyzing bundle composition...'      },
        { cls: '',        tx: '[PERF] Found 3 unused imports'               },
        { cls: '',        tx: '[PERF] Code-splitting applied'               },
        { cls: 'success', tx: '[PERF] Bundle reduced 34% → 64kb'           },
        { cls: 'prompt',  tx: '> devforge review --style --security'        },
        { cls: '',        tx: '[SEC] Scanning for vulnerabilities...'       },
        { cls: 'success', tx: '[REVIEW] No critical issues — score A+'      },
        { cls: 'dim',     tx: '[LOG] Report saved → security_audit.json'   },
      ]
    }
  ];

  // How long each line WAITS before appearing (ms) — randomised per line
  function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function buildColumn(colData) {
    const colEl = document.getElementById(colData.id);
    if (!colEl) return;

    // header
    const header = document.createElement('div');
    header.className = 'term-header';
    header.innerHTML = `
      <span class="term-title">${colData.title}</span>
      <div class="term-dot ${colData.dot}"></div>
    `;
    colEl.appendChild(header);

    const wrap = document.createElement('div');
    wrap.className = 'term-lines-wrap';
    colEl.appendChild(wrap);

    function runCycle(startDelay) {
      // Each line gets its own staggered delay — different per column run
      let cumulativeDelay = startDelay;
      colData.lines.forEach((lineData) => {
        // Each line waits a different random gap from the previous
        const gap = randBetween(180, 700);
        cumulativeDelay += gap;

        const delay = cumulativeDelay;
        setTimeout(() => {
          const el = document.createElement('div');
          el.className = 't-line' + (lineData.cls ? ' ' + lineData.cls : '');
          el.textContent = lineData.tx;
          wrap.appendChild(el);

          // Remove oldest line if overflow
          const existing = wrap.querySelectorAll('.t-line');
          if (existing.length > 30) existing[0].remove();

          // Scroll wrap to bottom
          wrap.scrollTop = wrap.scrollHeight;
        }, delay);
      });

      // Loop: restart after all lines + a pause, with fresh random delays
      const totalTime = cumulativeDelay + randBetween(1400, 3000);
      setTimeout(() => runCycle(0), totalTime);
    }

    // Each column starts at a different random offset so they're not in sync
    const initialOffset = randBetween(0, 2500);
    runCycle(initialOffset);
  }

  COLUMNS.forEach(buildColumn);

  /* ──────────────────────────────────────────────────
     HAMBURGER MENU
  ────────────────────────────────────────────────── */
  const ham = document.getElementById('ham');
  const mob = document.getElementById('mobnav');

  if (ham && mob) {
    ham.addEventListener('click', () => {
      mob.classList.toggle('open');
      const sp = ham.querySelectorAll('span');
      if (mob.classList.contains('open')) {
        sp[0].style.cssText = 'transform:rotate(45deg) translate(4px,4px)';
        sp[1].style.opacity = '0';
        sp[2].style.cssText = 'transform:rotate(-45deg) translate(4px,-4px)';
      } else {
        sp.forEach(s => s.removeAttribute('style'));
      }
    });
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mob.classList.remove('open');
      ham.querySelectorAll('span').forEach(s => s.removeAttribute('style'));
    }));
  }

  /* ──────────────────────────────────────────────────
     SCROLL REVEAL
  ────────────────────────────────────────────────── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.07 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

});
