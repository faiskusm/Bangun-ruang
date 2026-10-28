/* =====================================================
   Kalkulator Bangun Ruang — jQuery Version
   ===================================================== */

const shapes = {
  kubus: {
    nama: "Kubus",
    icon: "fas fa-cube",
    desc: "Bangun ruang dengan 6 sisi persegi yang sama besar.",
    formula: ["Volume: s³", "Luas Permukaan: 6 × s²"],
    inputs: [
      { id: "s", label: "Panjang Sisi (s)", placeholder: "Contoh: 5", unit: "cm" }
    ],
    hitung(v) {
      const s = v.s;
      const vol  = Math.pow(s, 3);
      const luas = 6 * Math.pow(s, 2);
      return {
        volume: vol,
        luas: luas,
        detail: `Sisi (s) = ${s} cm\nVolume = s³ = ${s}³ = ${vol} cm³\nLuas Permukaan = 6 × s² = 6 × ${s}² = ${luas} cm²`
      };
    }
  },

  balok: {
    nama: "Balok",
    icon: "fas fa-box",
    desc: "Bangun ruang dengan 3 pasang sisi persegi panjang yang saling berhadapan.",
    formula: ["Volume: p × l × t", "Luas: 2(pl + pt + lt)"],
    inputs: [
      { id: "p", label: "Panjang (p)", placeholder: "Contoh: 8", unit: "cm" },
      { id: "l", label: "Lebar (l)",   placeholder: "Contoh: 5", unit: "cm" },
      { id: "t", label: "Tinggi (t)",  placeholder: "Contoh: 3", unit: "cm" }
    ],
    hitung(v) {
      const { p, l, t } = v;
      const vol  = p * l * t;
      const luas = 2 * (p*l + p*t + l*t);
      return {
        volume: vol,
        luas: luas,
        detail: `Panjang (p) = ${p} cm, Lebar (l) = ${l} cm, Tinggi (t) = ${t} cm\n` +
                `Volume = p × l × t = ${p} × ${l} × ${t} = ${vol} cm³\n` +
                `Luas Permukaan = 2(pl + pt + lt) = 2(${p*l} + ${p*t} + ${l*t}) = ${luas} cm²`
      };
    }
  },

  bola: {
    nama: "Bola",
    icon: "fas fa-circle",
    desc: "Bangun ruang bulat sempurna dengan semua titik permukaannya berjarak sama dari pusat.",
    formula: ["Volume: (4/3) × π × r³", "Luas: 4 × π × r²"],
    inputs: [
      { id: "r", label: "Jari-jari (r)", placeholder: "Contoh: 7", unit: "cm" }
    ],
    hitung(v) {
      const r = v.r;
      const vol  = (4/3) * Math.PI * Math.pow(r, 3);
      const luas = 4 * Math.PI * Math.pow(r, 2);
      return {
        volume: parseFloat(vol.toFixed(2)),
        luas:   parseFloat(luas.toFixed(2)),
        detail: `Jari-jari (r) = ${r} cm\n` +
                `Volume = 4/3 × π × r³ = 4/3 × π × ${r}³ = ${vol.toFixed(2)} cm³\n` +
                `Luas Permukaan = 4 × π × r² = 4 × π × ${r}² = ${luas.toFixed(2)} cm²`
      };
    }
  },

  tabung: {
    nama: "Tabung",
    icon: "fas fa-database",
    desc: "Bangun ruang dengan dua lingkaran sejajar sebagai alas dan tutup, dihubungkan selimut.",
    formula: ["Volume: π × r² × t", "Luas: 2πr(r + t)"],
    inputs: [
      { id: "r", label: "Jari-jari (r)", placeholder: "Contoh: 7",  unit: "cm" },
      { id: "t", label: "Tinggi (t)",    placeholder: "Contoh: 10", unit: "cm" }
    ],
    hitung(v) {
      const { r, t } = v;
      const vol  = Math.PI * Math.pow(r, 2) * t;
      const luas = 2 * Math.PI * r * (r + t);
      return {
        volume: parseFloat(vol.toFixed(2)),
        luas:   parseFloat(luas.toFixed(2)),
        detail: `Jari-jari (r) = ${r} cm, Tinggi (t) = ${t} cm\n` +
                `Volume = π × r² × t = π × ${r}² × ${t} = ${vol.toFixed(2)} cm³\n` +
                `Luas Permukaan = 2πr(r + t) = 2π × ${r} × (${r} + ${t}) = ${luas.toFixed(2)} cm²`
      };
    }
  },

  kerucut: {
    nama: "Kerucut",
    icon: "fas fa-mountain",
    desc: "Bangun ruang dengan alas lingkaran dan sisi selimut meruncing ke titik puncak.",
    formula: ["Volume: (1/3) × π × r² × t", "Luas: πr(r + s)"],
    inputs: [
      { id: "r", label: "Jari-jari (r)", placeholder: "Contoh: 7",  unit: "cm" },
      { id: "t", label: "Tinggi (t)",    placeholder: "Contoh: 24", unit: "cm" }
    ],
    hitung(v) {
      const { r, t } = v;
      const s    = Math.sqrt(Math.pow(r, 2) + Math.pow(t, 2));
      const vol  = (1/3) * Math.PI * Math.pow(r, 2) * t;
      const luas = Math.PI * r * (r + s);
      return {
        volume: parseFloat(vol.toFixed(2)),
        luas:   parseFloat(luas.toFixed(2)),
        detail: `Jari-jari (r) = ${r} cm, Tinggi (t) = ${t} cm\n` +
                `Garis Pelukis (s) = √(r² + t²) = √(${r}² + ${t}²) = ${s.toFixed(2)} cm\n` +
                `Volume = 1/3 × π × r² × t = 1/3 × π × ${r}² × ${t} = ${vol.toFixed(2)} cm³\n` +
                `Luas Permukaan = πr(r + s) = π × ${r} × (${r} + ${s.toFixed(2)}) = ${luas.toFixed(2)} cm²`
      };
    }
  },

  limas_persegi: {
    nama: "Limas Persegi",
    icon: "fas fa-play",
    desc: "Bangun ruang dengan alas persegi dan 4 sisi segitiga yang bertemu di titik puncak.",
    formula: ["Volume: (1/3) × s² × t", "Luas: s² + 2s × t_s"],
    inputs: [
      { id: "s", label: "Sisi Alas (s)", placeholder: "Contoh: 6", unit: "cm" },
      { id: "t", label: "Tinggi (t)",    placeholder: "Contoh: 8", unit: "cm" }
    ],
    hitung(v) {
      const { s, t } = v;
      const ts   = Math.sqrt(Math.pow(t, 2) + Math.pow(s/2, 2));
      const vol  = (1/3) * Math.pow(s, 2) * t;
      const luas = Math.pow(s, 2) + 2 * s * ts;
      return {
        volume: parseFloat(vol.toFixed(2)),
        luas:   parseFloat(luas.toFixed(2)),
        detail: `Sisi Alas (s) = ${s} cm, Tinggi (t) = ${t} cm\n` +
                `Tinggi Sisi Segitiga (ts) = √(t² + (s/2)²) = √(${t}² + ${(s/2)}²) = ${ts.toFixed(2)} cm\n` +
                `Volume = 1/3 × s² × t = 1/3 × ${s}² × ${t} = ${vol.toFixed(2)} cm³\n` +
                `Luas Permukaan = s² + 2s × ts = ${s}² + 2 × ${s} × ${ts.toFixed(2)} = ${luas.toFixed(2)} cm²`
      };
    }
  },

  prisma_segitiga: {
    nama: "Prisma Segitiga",
    icon: "fas fa-prism",
    desc: "Bangun ruang dengan alas segitiga dan tiga sisi persegi panjang yang tegak lurus.",
    formula: ["Volume: (1/2 × a × t_a) × t", "Luas: (keliling alas × t) + 2 × L alas"],
    inputs: [
      { id: "a",  label: "Alas Segitiga (a)",    placeholder: "Contoh: 6",  unit: "cm" },
      { id: "ta", label: "Tinggi Segitiga (ta)", placeholder: "Contoh: 4",  unit: "cm" },
      { id: "t",  label: "Tinggi Prisma (t)",    placeholder: "Contoh: 10", unit: "cm" }
    ],
    hitung(v) {
      const { a, ta, t } = v;
      const b     = Math.sqrt(Math.pow(a/2, 2) + Math.pow(ta, 2));
      const lalas = 0.5 * a * ta;
      const vol   = lalas * t;
      const luas  = (a + b + b) * t + 2 * lalas;
      return {
        volume: parseFloat(vol.toFixed(2)),
        luas:   parseFloat(luas.toFixed(2)),
        detail: `Alas Segitiga (a) = ${a} cm, Tinggi Segitiga (ta) = ${ta} cm, Tinggi Prisma (t) = ${t} cm\n` +
                `Luas Alas = 1/2 × a × ta = 1/2 × ${a} × ${ta} = ${lalas.toFixed(2)} cm²\n` +
                `Sisi Miring ≈ ${b.toFixed(2)} cm\n` +
                `Volume = Luas Alas × t = ${lalas.toFixed(2)} × ${t} = ${vol.toFixed(2)} cm³\n` +
                `Luas Permukaan = (Keliling × t) + 2 × Luas Alas = ${luas.toFixed(2)} cm²`
      };
    }
  },

  ellipsoid: {
    nama: "Ellipsoid",
    icon: "fas fa-egg",
    desc: "Bangun ruang berbentuk elips 3D dengan tiga jari-jari berbeda pada tiap sumbu.",
    formula: ["Volume: (4/3) × π × a × b × c", "Luas: ≈ 4π × ((ab^p + ac^p + bc^p)/3)^(1/p)"],
    inputs: [
      { id: "a", label: "Jari-jari a (sumbu X)", placeholder: "Contoh: 5", unit: "cm" },
      { id: "b", label: "Jari-jari b (sumbu Y)", placeholder: "Contoh: 4", unit: "cm" },
      { id: "c", label: "Jari-jari c (sumbu Z)", placeholder: "Contoh: 3", unit: "cm" }
    ],
    hitung(v) {
      const { a, b, c } = v;
      const vol  = (4/3) * Math.PI * a * b * c;
      const p    = 1.6075;
      const luas = 4 * Math.PI * Math.pow(
        (Math.pow(a*b, p) + Math.pow(a*c, p) + Math.pow(b*c, p)) / 3,
        1/p
      );
      return {
        volume: parseFloat(vol.toFixed(2)),
        luas:   parseFloat(luas.toFixed(2)),
        detail: `Jari-jari a = ${a} cm, b = ${b} cm, c = ${c} cm\n` +
                `Volume = 4/3 × π × a × b × c = 4/3 × π × ${a} × ${b} × ${c} = ${vol.toFixed(2)} cm³\n` +
                `Luas Permukaan ≈ ${luas.toFixed(2)} cm² (aproksimasi Knud Thomsen)`
      };
    }
  }
};

/* =====================================================
   STATE
   ===================================================== */
let currentShape = "kubus";
let history = [];

/* =====================================================
   DOCUMENT READY — semua event handler pakai jQuery
   ===================================================== */
$(document).ready(function () {

  // Pilih kubus sebagai default
  selectShape("kubus");

  // ---- Event: klik tombol pilih bangun ----
  $(document).on("click", ".shape-btn", function () {
    const key = $(this).data("shape");
    selectShape(key, $(this));
  });

  // ---- Event: klik Hitung ----
  $("#btn-hitung").on("click", function () {
    hitung();
  });

  // ---- Event: klik Reset ----
  $("#btn-reset").on("click", function () {
    resetForm();
  });

  // ---- Event: klik Hapus Riwayat ----
  $("#btn-clear").on("click", function () {
    clearHistory();
  });

  // ---- Event: input real-time (live preview) ----
  $(document).on("input", "#input-area input", function () {
    livePreview();
    // Hapus border error saat user mulai mengetik
    if ($(this).val() !== "") {
      $(this).removeClass("input-error").addClass("input-ok");
    } else {
      $(this).removeClass("input-ok");
    }
  });

});

/* =====================================================
   SELECT SHAPE
   ===================================================== */
function selectShape(key) {
  currentShape = key;
  const shape = shapes[key];

  // Update tombol aktif dengan animasi
  $(".shape-btn").removeClass("active");
  $(`.shape-btn[data-shape="${key}"]`).addClass("active");

  // Animasi shape-visual: fadeOut → update → fadeIn
  const $visual = $("#shape-visual");
  $visual.addClass("pulse");
  setTimeout(() => $visual.removeClass("pulse"), 600);

  $("#shape-visual").html(`<i class="${shape.icon}"></i>`);
  $("#shape-title").text(shape.nama);
  $("#shape-desc").text(shape.desc);
  $("#shape-formula").html(shape.formula.map(f => `<span>${f}</span>`).join(""));

  // Render input fields
  const inputsHtml = shape.inputs.map(inp => `
    <div class="input-group">
      <label for="${inp.id}">${inp.label} (${inp.unit})</label>
      <input
        type="number"
        id="${inp.id}"
        placeholder="${inp.placeholder}"
        min="0.01"
        step="any"
        autocomplete="off"
      />
      <span class="input-hint"></span>
    </div>
  `).join("");

  // Animasi slide-in pada input area
  const $area = $("#input-area");
  $area.addClass("slide-out");
  setTimeout(() => {
    $area.html(inputsHtml).removeClass("slide-out").addClass("slide-in");
    setTimeout(() => $area.removeClass("slide-in"), 400);
  }, 200);

  // Sembunyikan live preview & reset hasil
  $("#live-preview").hide();
  $("#result-content").html(
    `<p class="result-placeholder">Masukkan ukuran dan klik <strong>Hitung</strong> untuk melihat hasil.</p>`
  );
}

/* =====================================================
   LIVE PREVIEW — kalkulasi real-time saat input berubah
   ===================================================== */
function livePreview() {
  const shape = shapes[currentShape];
  const values = {};

  for (const inp of shape.inputs) {
    const val = parseFloat($(`#${inp.id}`).val());
    if (!val || val <= 0) {
      $("#live-preview").fadeOut(200);
      return;
    }
    values[inp.id] = val;
  }

  // Semua input valid → hitung dan tampilkan
  const hasil = shape.hitung(values);
  $("#lp-vol-val").text(hasil.volume.toLocaleString("id-ID"));
  $("#lp-luas-val").text(hasil.luas.toLocaleString("id-ID"));
  $("#live-preview").fadeIn(300);
}

/* =====================================================
   HITUNG — validasi jQuery + tampilkan hasil animasi
   ===================================================== */
function hitung() {
  const shape = shapes[currentShape];
  const values = {};
  let valid = true;
  let firstError = null;

  // Validasi semua input
  for (const inp of shape.inputs) {
    const $el = $(`#${inp.id}`);
    const val = parseFloat($el.val());

    $el.removeClass("input-error input-ok");

    if (!$el.val() || isNaN(val) || val <= 0) {
      $el.addClass("input-error").next(".input-hint").text("Wajib diisi dengan angka positif!");
      if (!firstError) firstError = $el;
      valid = false;
    } else {
      $el.addClass("input-ok").next(".input-hint").text("");
      values[inp.id] = val;
    }
  }

  if (!valid) {
    // Shake animasi pada tombol hitung
    $("#btn-hitung").addClass("shake");
    setTimeout(() => $("#btn-hitung").removeClass("shake"), 500);
    showToast("⚠️ Mohon isi semua kolom dengan angka positif!", "error");
    if (firstError) firstError.focus();
    return;
  }

  const hasil = shape.hitung(values);

  // Animasi tampilkan hasil
  const $rc = $("#result-content");
  $rc.addClass("fade-out");

  setTimeout(() => {
    $rc.html(`
      <div class="result-box">
        <div class="result-item volume">
          <div class="result-label">Volume</div>
          <div class="result-value counter" data-target="${hasil.volume}">${hasil.volume.toLocaleString("id-ID")}</div>
          <div class="result-unit">cm³</div>
        </div>
        <div class="result-item luas">
          <div class="result-label">Luas Permukaan</div>
          <div class="result-value counter" data-target="${hasil.luas}">${hasil.luas.toLocaleString("id-ID")}</div>
          <div class="result-unit">cm²</div>
        </div>
      </div>
      <div class="result-detail">
        <p>${hasil.detail.replace(/\n/g, "<br/>")}</p>
      </div>
    `);
    $rc.removeClass("fade-out").addClass("fade-in");
    setTimeout(() => $rc.removeClass("fade-in"), 500);
  }, 250);

  // Animasi angka counter
  setTimeout(() => animateCounters(), 300);

  // Scroll ke hasil
  $("html, body").animate({
    scrollTop: $("#result-card").offset().top - 20
  }, 500);

  // Toast sukses
  showToast(`✅ Berhasil menghitung ${shape.nama}!`, "success");

  // Simpan ke riwayat
  const inputDesc = shape.inputs
    .map(inp => `${inp.label.split(" ")[0]} = ${values[inp.id]}`)
    .join(", ");

  history.unshift({
    shape: shape.nama,
    input: inputDesc,
    volume: hasil.volume,
    luas: hasil.luas
  });

  renderHistory();
}

/* =====================================================
   COUNTER ANIMATION
   ===================================================== */
function animateCounters() {
  $(".counter").each(function () {
    const $el     = $(this);
    const target  = parseFloat($el.data("target"));
    const isFloat = !Number.isInteger(target);
    let current   = 0;
    const duration = 800;
    const steps    = 40;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      $el.text(
        isFloat
          ? parseFloat(current.toFixed(2)).toLocaleString("id-ID")
          : Math.floor(current).toLocaleString("id-ID")
      );
    }, duration / steps);
  });
}

/* =====================================================
   RESET FORM
   ===================================================== */
function resetForm() {
  const shape = shapes[currentShape];
  shape.inputs.forEach(inp => {
    $(`#${inp.id}`).val("").removeClass("input-error input-ok");
    $(`#${inp.id}`).next(".input-hint").text("");
  });

  $("#live-preview").fadeOut(200);
  $("#result-content").html(
    `<p class="result-placeholder">Masukkan ukuran dan klik <strong>Hitung</strong> untuk melihat hasil.</p>`
  );
  showToast("🔄 Form telah direset.", "info");
}

/* =====================================================
   RENDER HISTORY
   ===================================================== */
function renderHistory() {
  const $container = $("#history-list");

  if (history.length === 0) {
    $container.html(`<p class="result-placeholder">Belum ada riwayat perhitungan.</p>`);
    return;
  }

  const html = history.map((h, i) => `
    <div class="history-item" style="animation-delay: ${i * 0.05}s">
      <span class="hi-shape"><i class="fas fa-calculator"></i> ${h.shape}</span>
      <span class="hi-data">${h.input}</span>
      <span class="hi-result">
        <span class="hi-vol">V: ${h.volume} cm³</span>
        <span class="hi-luas">L: ${h.luas} cm²</span>
      </span>
    </div>
  `).join("");

  $container.html(html);
}

/* =====================================================
   CLEAR HISTORY
   ===================================================== */
function clearHistory() {
  if (history.length === 0) return;

  // Custom confirm dengan jQuery animasi
  if (confirm("Hapus semua riwayat perhitungan?")) {
    $("#history-list .history-item").each(function (i) {
      const $item = $(this);
      setTimeout(() => {
        $item.addClass("fade-remove");
      }, i * 60);
    });
    setTimeout(() => {
      history = [];
      renderHistory();
    }, history.length * 60 + 300);
    showToast("🗑️ Riwayat telah dihapus.", "info");
  }
}

/* =====================================================
   TOAST NOTIFICATION
   ===================================================== */
function showToast(msg, type = "info") {
  const $toast = $("#toast");
  $toast
    .removeClass("toast-success toast-error toast-info")
    .addClass(`toast-${type}`)
    .text(msg)
    .stop(true)
    .fadeIn(300);

  setTimeout(() => {
    $toast.fadeOut(400);
  }, 2800);
}
