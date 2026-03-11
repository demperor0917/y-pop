import { useState, useEffect, useRef } from "react";

const SECTIONS = ["hero", "services", "howto", "pricing", "request", "faq", "footer"];

// ─── Color Tokens ───
const C = {
  black: "#0A0A0A",
  dark: "#141418",
  card: "#1C1C22",
  border: "#2A2A33",
  text: "#E8E6E1",
  muted: "#9C9A94",
  accent: "#FF2D55",    // Y-POP signature red-pink
  accentGlow: "rgba(255,45,85,0.25)",
  yellow: "#FFD60A",
  green: "#32D74B",
  blue: "#0A84FF",
  purple: "#BF5AF2",
};

// ─── Fonts via Google ───
const fontLink = "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Space+Grotesk:wght@400;500;700&family=Sora:wght@300;400;600;700;800&display=swap";

// ─── Animated Counter ───
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          setCount(Math.floor(p * end));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── FAQ Item ───
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        borderBottom: `1px solid ${C.border}`,
        padding: "20px 0",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Noto Sans KR'", fontWeight: 500, fontSize: 16, color: C.text }}>
          {q}
        </span>
        <span
          style={{
            color: C.accent,
            fontSize: 24,
            fontWeight: 300,
            transition: "transform 0.3s",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            flexShrink: 0,
            marginLeft: 16,
          }}
        >
          +
        </span>
      </div>
      <div
        style={{
          maxHeight: open ? 300 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease, opacity 0.3s",
          opacity: open ? 1 : 0,
        }}
      >
        <p style={{ marginTop: 14, color: C.muted, lineHeight: 1.7, fontSize: 14, fontFamily: "'Noto Sans KR'" }}>
          {a}
        </p>
      </div>
    </div>
  );
}

// ─── Service Card ───
function ServiceCard({ icon, title, desc, color, delay }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVis(true);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: C.card,
        borderRadius: 16,
        padding: "36px 28px",
        border: `1px solid ${C.border}`,
        position: "relative",
        overflow: "hidden",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = `0 20px 60px ${color}22`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = C.border;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: `${color}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
          marginBottom: 20,
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontFamily: "'Noto Sans KR'", fontWeight: 700, fontSize: 18, color: C.text, marginBottom: 10 }}>
        {title}
      </h3>
      <p style={{ fontFamily: "'Noto Sans KR'", fontSize: 14, color: C.muted, lineHeight: 1.7 }}>
        {desc}
      </p>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 120,
          height: 120,
          background: `radial-gradient(circle at top right, ${color}10, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ─── Step Card ───
function StepCard({ num, title, desc, delay }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVis(true);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: 20,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateX(0)" : "translateX(-30px)",
        transition: `all 0.6s ease ${delay}s`,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.accent}, ${C.purple})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Sora'",
          fontWeight: 800,
          fontSize: 20,
          color: "#fff",
          flexShrink: 0,
        }}
      >
        {num}
      </div>
      <div>
        <h4 style={{ fontFamily: "'Noto Sans KR'", fontWeight: 700, fontSize: 17, color: C.text, marginBottom: 6 }}>
          {title}
        </h4>
        <p style={{ fontFamily: "'Noto Sans KR'", fontSize: 14, color: C.muted, lineHeight: 1.7 }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

// ═══════════════════ MAIN APP ═══════════════════
export default function YPop() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", url: "", qty: "", memo: "",
    category: "", subCategories: [], customCategory: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // 관심 분야 카테고리 & 세부 항목 데이터
  const CATEGORIES = {
    "패션/의류": ["남성의류", "여성의류", "신발", "가방", "액세서리", "언더웨어"],
    "뷰티/화장품": ["스킨케어", "메이크업", "헤어케어", "바디케어", "향수", "네일/뷰티툴"],
    "전자제품/IT": ["스마트폰 액세서리", "이어폰/헤드셋", "충전기/케이블", "스마트홈", "PC주변기기", "카메라/촬영장비"],
    "생활용품/잡화": ["주방용품", "욕실용품", "수납/정리", "인테리어 소품", "문구/사무", "반려동물용품"],
    "식품/건강": ["건강보조식품", "차/음료", "간식/과자", "조미료/소스", "다이어트식품", "전통식품"],
    "완구/키즈": ["유아완구", "피규어/프라모델", "보드게임/퍼즐", "아동의류", "유아용품", "교육/학습"],
    "스포츠/아웃도어": ["헬스/피트니스", "러닝/운동화", "캠핑용품", "자전거", "수영/수상스포츠", "등산/트레킹"],
  };

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navSolid = scrollY > 60;

  // ★ 아래 URL을 본인의 Google Apps Script 웹앱 URL로 교체하세요
  const GOOGLE_SHEET_URL = "여기에_본인의_웹앱_URL을_붙여넣으세요";

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.url) return alert("이름과 상품 URL을 입력해주세요.");
    
    setIsLoading(true);
    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          category: formData.category === "직접 입력" ? formData.customCategory : formData.category,
          subCategories: formData.subCategories.join(", "),
          url: formData.url,
          qty: formData.qty,
          memo: formData.memo,
          timestamp: new Date().toLocaleString("ko-KR"),
        }),
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({ name: "", phone: "", email: "", url: "", qty: "", memo: "", category: "", subCategories: [], customCategory: "" });
    } catch (err) {
      alert("전송 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  return (
    <div style={{ background: C.black, minHeight: "100vh", width: "100%", color: C.text, overflowX: "hidden" }}>
      <link href={fontLink} rel="stylesheet" />
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${C.black}; margin:0; padding:0; }
        #root { max-width:none !important; width:100% !important; margin:0 !important; padding:0 !important; text-align:left !important; }
        ::selection { background: ${C.accent}; color: #fff; }
        input, textarea { outline: none; }
        input::placeholder, textarea::placeholder { color: ${C.muted}; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .hero-badge {
          display:inline-flex; align-items:center; gap:8px;
          padding:8px 18px; border-radius:100px;
          background: ${C.accent}15; border:1px solid ${C.accent}40;
          font-size:13px; color:${C.accent}; font-family:'Noto Sans KR';
          animation: pulse 2.5s infinite;
        }
        .cta-btn {
          display:inline-flex; align-items:center; gap:8px;
          padding:16px 36px; border-radius:12px;
          background: linear-gradient(135deg, ${C.accent}, #E6194B);
          color:#fff; font-family:'Noto Sans KR'; font-weight:700; font-size:16px;
          border:none; cursor:pointer; transition:all 0.3s;
          box-shadow: 0 8px 32px ${C.accentGlow};
        }
        .cta-btn:hover { transform:translateY(-2px); box-shadow: 0 12px 40px ${C.accentGlow}; }
        .nav-link {
          font-family:'Noto Sans KR'; font-size:14px; font-weight:500;
          color:${C.muted}; cursor:pointer; transition:color 0.2s; background:none; border:none;
        }
        .nav-link:hover { color:${C.text}; }
        .section-tag {
          display:inline-block; padding:6px 14px; border-radius:6px;
          background:${C.accent}12; color:${C.accent}; font-size:12px;
          font-family:'Sora'; font-weight:600; letter-spacing:1.5px; text-transform:uppercase;
          margin-bottom:16px;
        }
        .input-field {
          width:100%; padding:14px 18px; border-radius:10px;
          background:${C.dark}; border:1px solid ${C.border};
          color:${C.text}; font-family:'Noto Sans KR'; font-size:14px;
          transition:border-color 0.2s;
        }
        .input-field:focus { border-color:${C.accent}; }
        @media(max-width:768px) {
          .desktop-only { display:none !important; }
          .mobile-only { display:flex !important; }
        }
        @media(min-width:769px) {
          .mobile-only { display:none !important; }
        }
      `}</style>

      {/* ═══ NAVBAR ═══ */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 1000,
          background: navSolid ? `${C.dark}ee` : "transparent",
          backdropFilter: navSolid ? "blur(20px)" : "none",
          borderBottom: navSolid ? `1px solid ${C.border}` : "none",
          transition: "all 0.3s",
        }}
      >
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 40px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }} onClick={() => scrollTo("hero")}>
          <span style={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 22, color: C.accent }}>Y</span>
          <span style={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 22, color: C.text }}>-POP</span>
        </div>

        <div className="desktop-only" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <button className="nav-link" onClick={() => scrollTo("services")}>서비스</button>
          <button className="nav-link" onClick={() => scrollTo("howto")}>이용방법</button>
          <button className="nav-link" onClick={() => scrollTo("pricing")}>요금안내</button>
          <button className="nav-link" onClick={() => scrollTo("faq")}>FAQ</button>
          <button
            onClick={() => scrollTo("request")}
            style={{
              padding: "8px 20px",
              borderRadius: 8,
              background: C.accent,
              color: "#fff",
              fontFamily: "'Noto Sans KR'",
              fontWeight: 600,
              fontSize: 13,
              border: "none",
              cursor: "pointer",
            }}
          >
            조사 대행 신청
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-only"
          onClick={() => setMobileMenu(!mobileMenu)}
          style={{
            background: "none",
            border: "none",
            color: C.text,
            fontSize: 24,
            cursor: "pointer",
            display: "none",
            alignItems: "center",
          }}
        >
          {mobileMenu ? "✕" : "☰"}
        </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenu && (
        <div
          className="mobile-only"
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            bottom: 0,
            background: `${C.dark}f5`,
            backdropFilter: "blur(20px)",
            zIndex: 999,
            display: "none",
            flexDirection: "column",
            padding: 32,
            gap: 24,
          }}
        >
          {[["서비스", "services"], ["이용방법", "howto"], ["요금안내", "pricing"], ["FAQ", "faq"], ["조사 대행 신청", "request"]].map(([l, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: "none",
                border: "none",
                color: C.text,
                fontFamily: "'Noto Sans KR'",
                fontSize: 20,
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      )}

      {/* ═══ HERO ═══ */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "120px 40px 80px",
        }}
      >
        {/* Background gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${C.accent}18, transparent 70%)`,
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${C.blue}12, transparent 70%)`,
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 800, textAlign: "center", position: "relative", zIndex: 1, animation: "slideUp 0.8s ease" }}>
          <div className="hero-badge">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent }} />
            중국 시장조사 대행 전문 파트너
          </div>

          <h1
            style={{
              fontFamily: "'Sora', 'Noto Sans KR'",
              fontWeight: 900,
              fontSize: "clamp(36px, 7vw, 72px)",
              lineHeight: 1.1,
              marginTop: 28,
              marginBottom: 24,
              letterSpacing: "-1px",
            }}
          >
            <span style={{ color: C.accent }}>Y-POP</span>
            <br />
            <span style={{ color: C.text }}>정확하고 빠른</span>
            <br />
            <span
              style={{
                background: `linear-gradient(90deg, ${C.yellow}, ${C.accent})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                whiteSpace: "nowrap",
              }}
            >
              중국 시장조사
            </span>
          </h1>

          <p
            style={{
              fontFamily: "'Noto Sans KR'",
              fontSize: "clamp(15px, 2vw, 18px)",
              color: C.muted,
              lineHeight: 1.8,
              maxWidth: 520,
              margin: "0 auto 40px",
            }}
          >
            타오바오 · 1688 · 알리바바 시장의 트렌드와 상품을
            <br />
            데이터 기반으로 조사하고 리포트해 드립니다.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="cta-btn" onClick={() => scrollTo("request")}>
              조사 신청하기
              <span style={{ fontSize: 18 }}>→</span>
            </button>
            <button
              onClick={() => scrollTo("howto")}
              style={{
                padding: "16px 36px",
                borderRadius: 12,
                background: "transparent",
                color: C.text,
                fontFamily: "'Noto Sans KR'",
                fontWeight: 600,
                fontSize: 16,
                border: `1px solid ${C.border}`,
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.muted)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
            >
              이용방법 보기
            </button>
          </div>

          {/* Stats bar */}
          <div
            style={{
              marginTop: 64,
              display: "flex",
              justifyContent: "center",
              gap: "clamp(24px, 5vw, 64px)",
              flexWrap: "wrap",
            }}
          >
            {[
              { n: 3200, s: "+", l: "누적 조사 건수" },
              { n: 98, s: "%", l: "고객 만족도" },
              { n: 3, s: "일", l: "평균 리포트 소요" },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: "clamp(28px, 4vw, 42px)", color: C.text }}>
                  <Counter end={item.n} suffix={item.s} />
                </div>
                <div style={{ fontFamily: "'Noto Sans KR'", fontSize: 13, color: C.muted, marginTop: 4 }}>{item.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="section-tag">SERVICES</div>
          <h2 style={{ fontFamily: "'Noto Sans KR'", fontWeight: 900, fontSize: "clamp(24px, 4vw, 36px)" }}>
            Y-POP이 제공하는 서비스
          </h2>
          <p style={{ color: C.muted, fontFamily: "'Noto Sans KR'", fontSize: 15, marginTop: 12 }}>
            중국 시장의 트렌드·상품·공장 정보를 전문 매니저가 조사합니다
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          <ServiceCard
            icon="📊"
            title="시장 트렌드 조사"
            desc="타오바오·1688 플랫폼의 실시간 인기 상품, 검색 키워드, 카테고리 트렌드를 분석해 드립니다."
            color={C.accent}
            delay={0}
          />
          <ServiceCard
            icon="🔍"
            title="상품 소싱 리서치"
            desc="원하는 상품의 공급처·가격대·MOQ·품질 등급을 비교 분석하여 최적의 소싱처를 찾아드립니다."
            color={C.blue}
            delay={0.1}
          />
          <ServiceCard
            icon="🏭"
            title="공장 조사"
            desc="1688·알리바바 공장의 생산 능력, 인증, 샘플 가능 여부 등을 직접 확인하고 리포트합니다."
            color={C.green}
            delay={0.2}
          />
          <ServiceCard
            icon="📋"
            title="경쟁사 분석"
            desc="중국 내 경쟁 브랜드·상품의 가격, 리뷰, 판매량 데이터를 수집하여 비교 분석 리포트를 제공합니다."
            color={C.purple}
            delay={0.3}
          />
        </div>
      </section>

      {/* ═══ HOW TO ═══ */}
      <section id="howto" style={{ padding: "100px 40px", background: C.dark }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="section-tag">HOW IT WORKS</div>
            <h2 style={{ fontFamily: "'Noto Sans KR'", fontWeight: 900, fontSize: "clamp(24px, 4vw, 36px)" }}>
              이용 방법
            </h2>
            <p style={{ color: C.muted, fontFamily: "'Noto Sans KR'", fontSize: 15, marginTop: 12 }}>
              4단계로 간편하게 조사 대행을 신청하세요
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            <StepCard num={1} title="조사 요청 제출" desc="조사를 원하는 상품·키워드·카테고리 정보를 제출하면 끝. 타오바오·1688 링크도 가능합니다." delay={0} />
            <StepCard num={2} title="견적 확인 & 결제" desc="조사 범위와 난이도에 따른 정확한 견적을 전문 매니저가 안내해 드립니다." delay={0.15} />
            <StepCard num={3} title="시장 조사 진행" desc="결제 확인 후 전담 매니저가 중국 현지 플랫폼에서 데이터를 수집하고 분석합니다." delay={0.3} />
            <StepCard num={4} title="리포트 전달" desc="조사 완료 후 상세 리포트를 전달해 드립니다. 추가 질문이나 보충 조사도 가능합니다." delay={0.45} />
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="section-tag">PRICING</div>
          <h2 style={{ fontFamily: "'Noto Sans KR'", fontWeight: 900, fontSize: "clamp(24px, 4vw, 36px)" }}>
            투명한 요금 안내
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {[
            {
              name: "Lite",
              sub: "소규모 조사",
              price: "7%",
              unit: "조사 수수료",
              features: ["1건부터 신청 가능", "기본 리포트 제공", "3영업일 내 전달", "카카오톡 상담"],
              accent: C.blue,
              popular: false,
            },
            {
              name: "Pro",
              sub: "사업자 추천",
              price: "5%",
              unit: "조사 수수료",
              features: ["대량 조사 할인", "심층 분석 + 데이터 리포트", "우선 처리", "전담 매니저 배정", "세금계산서 발행"],
              accent: C.accent,
              popular: true,
            },
            {
              name: "Enterprise",
              sub: "대량 / OEM",
              price: "협의",
              unit: "맞춤 견적",
              features: ["공장 현지 실사", "OEM/ODM 타당성 조사", "경쟁사 종합 분석", "정기 시장 모니터링", "월 정산 가능"],
              accent: C.purple,
              popular: false,
            },
          ].map((plan) => (
            <div
              key={plan.name}
              style={{
                background: C.card,
                borderRadius: 16,
                padding: "36px 28px",
                border: `1px solid ${plan.popular ? plan.accent : C.border}`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {plan.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    padding: "4px 12px",
                    borderRadius: 6,
                    background: C.accent,
                    color: "#fff",
                    fontFamily: "'Sora'",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  POPULAR
                </div>
              )}
              <div style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 14, color: plan.accent, marginBottom: 4 }}>
                {plan.name}
              </div>
              <div style={{ fontFamily: "'Noto Sans KR'", fontSize: 13, color: C.muted, marginBottom: 20 }}>
                {plan.sub}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                <span style={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 40, color: C.text }}>{plan.price}</span>
                <span style={{ fontFamily: "'Noto Sans KR'", fontSize: 13, color: C.muted }}>{plan.unit}</span>
              </div>
              <div style={{ borderTop: `1px solid ${C.border}`, margin: "20px 0", paddingTop: 20 }}>
                {plan.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center" }}>
                    <span style={{ color: plan.accent, fontSize: 14 }}>✓</span>
                    <span style={{ fontFamily: "'Noto Sans KR'", fontSize: 14, color: C.text }}>{f}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => scrollTo("request")}
                style={{
                  width: "100%",
                  padding: "12px 0",
                  borderRadius: 10,
                  background: plan.popular ? plan.accent : "transparent",
                  color: plan.popular ? "#fff" : C.text,
                  border: plan.popular ? "none" : `1px solid ${C.border}`,
                  fontFamily: "'Noto Sans KR'",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              >
                신청하기
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ REQUEST FORM ═══ */}
      <section id="request" style={{ padding: "100px 40px", background: C.dark }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-tag">REQUEST</div>
            <h2 style={{ fontFamily: "'Noto Sans KR'", fontWeight: 900, fontSize: "clamp(24px, 4vw, 36px)" }}>
              조사 대행 신청
            </h2>
            <p style={{ color: C.muted, fontFamily: "'Noto Sans KR'", fontSize: 15, marginTop: 12 }}>
              조사하고 싶은 상품·키워드를 알려주세요. 빠르게 견적을 안내해 드립니다.
            </p>
          </div>

          {submitted ? (
            <div
              style={{
                textAlign: "center",
                padding: 48,
                background: C.card,
                borderRadius: 16,
                border: `1px solid ${C.green}40`,
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontFamily: "'Noto Sans KR'", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
                신청이 완료되었습니다!
              </h3>
              <p style={{ color: C.muted, fontFamily: "'Noto Sans KR'", fontSize: 14 }}>
                담당 매니저가 확인 후 빠르게 연락드리겠습니다.
              </p>
            </div>
          ) : (
            <div
              style={{
                background: C.card,
                borderRadius: 16,
                padding: "36px 28px",
                border: `1px solid ${C.border}`,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontFamily: "'Noto Sans KR'", fontSize: 13, color: C.muted, marginBottom: 6, display: "block" }}>
                    이름 *
                  </label>
                  <input
                    className="input-field"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "'Noto Sans KR'", fontSize: 13, color: C.muted, marginBottom: 6, display: "block" }}>
                    연락처
                  </label>
                  <input
                    className="input-field"
                    placeholder="010-0000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: "'Noto Sans KR'", fontSize: 13, color: C.muted, marginBottom: 6, display: "block" }}>
                  이메일
                </label>
                <input
                  className="input-field"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* ── 관심 분야 ── */}
              <div>
                <label style={{ fontFamily: "'Noto Sans KR'", fontSize: 13, color: C.muted, marginBottom: 10, display: "block" }}>
                  관심 분야
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[...Object.keys(CATEGORIES), "직접 입력"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        category: formData.category === cat ? "" : cat,
                        subCategories: formData.category === cat ? [] : formData.subCategories,
                        customCategory: formData.category === cat ? "" : formData.customCategory,
                      })}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 8,
                        border: `1px solid ${formData.category === cat ? C.accent : C.border}`,
                        background: formData.category === cat ? `${C.accent}18` : C.dark,
                        color: formData.category === cat ? C.accent : C.muted,
                        fontFamily: "'Noto Sans KR'",
                        fontSize: 13,
                        fontWeight: formData.category === cat ? 600 : 400,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* 직접 입력 필드 */}
                {formData.category === "직접 입력" && (
                  <input
                    className="input-field"
                    placeholder="관심 분야를 직접 입력하세요"
                    value={formData.customCategory}
                    onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                    style={{ marginTop: 12 }}
                  />
                )}

                {/* 세부 항목 버튼 */}
                {formData.category && formData.category !== "직접 입력" && CATEGORIES[formData.category] && (
                  <div style={{ marginTop: 12 }}>
                    <label style={{ fontFamily: "'Noto Sans KR'", fontSize: 12, color: C.muted, marginBottom: 8, display: "block" }}>
                      세부 항목 (복수 선택 가능)
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {CATEGORIES[formData.category].map((sub) => {
                        const isSelected = formData.subCategories.includes(sub);
                        return (
                          <button
                            key={sub}
                            type="button"
                            onClick={() => {
                              const next = isSelected
                                ? formData.subCategories.filter((s) => s !== sub)
                                : [...formData.subCategories, sub];
                              setFormData({ ...formData, subCategories: next });
                            }}
                            style={{
                              padding: "6px 12px",
                              borderRadius: 6,
                              border: `1px solid ${isSelected ? C.green : C.border}`,
                              background: isSelected ? `${C.green}15` : "transparent",
                              color: isSelected ? C.green : C.muted,
                              fontFamily: "'Noto Sans KR'",
                              fontSize: 12,
                              fontWeight: isSelected ? 600 : 400,
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                          >
                            {isSelected ? "✓ " : ""}{sub}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label style={{ fontFamily: "'Noto Sans KR'", fontSize: 13, color: C.muted, marginBottom: 6, display: "block" }}>
                  조사 대상 URL 또는 키워드 *
                </label>
                <input
                  className="input-field"
                  placeholder="타오바오·1688 상품 링크 또는 조사할 키워드를 입력하세요"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontFamily: "'Noto Sans KR'", fontSize: 13, color: C.muted, marginBottom: 6, display: "block" }}>
                  조사 희망 수량/범위
                </label>
                <input
                  className="input-field"
                  placeholder="예: 상위 10개 상품 비교, 공장 3곳 조사"
                  value={formData.qty}
                  onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontFamily: "'Noto Sans KR'", fontSize: 13, color: C.muted, marginBottom: 6, display: "block" }}>
                  요청사항
                </label>
                <textarea
                  className="input-field"
                  rows={4}
                  placeholder="색상, 사이즈, 옵션 등 추가 요청사항을 입력하세요"
                  value={formData.memo}
                  onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
                  style={{ resize: "vertical" }}
                />
              </div>

              <button className="cta-btn" onClick={handleSubmit} disabled={isLoading} style={{ width: "100%", justifyContent: "center", marginTop: 8, opacity: isLoading ? 0.7 : 1 }}>
                {isLoading ? "전송 중..." : "조사 신청하기"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" style={{ padding: "100px 40px", maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="section-tag">FAQ</div>
          <h2 style={{ fontFamily: "'Noto Sans KR'", fontWeight: 900, fontSize: "clamp(24px, 4vw, 36px)" }}>
            자주 묻는 질문
          </h2>
        </div>

        <div>
          <FAQItem
            q="최소 조사 건수가 있나요?"
            a="Lite 플랜은 1건부터 신청 가능합니다. Pro 플랜의 경우에도 최소 건수 제한은 없으며, 조사 범위에 따라 할인율이 적용됩니다."
          />
          <FAQItem
            q="조사 리포트는 얼마나 걸리나요?"
            a="기본 조사 기준 3~5영업일 소요됩니다. 심층 분석이나 공장 실사의 경우 1~2주 정도 소요되며, 조사 범위에 따라 달라질 수 있습니다."
          />
          <FAQItem
            q="사업자가 아니어도 이용할 수 있나요?"
            a="네, 개인 고객도 Lite 플랜으로 자유롭게 이용 가능합니다. 별도 자격 요건 없이 누구나 신청할 수 있습니다."
          />
          <FAQItem
            q="결제는 어떻게 하나요?"
            a="무통장 입금과 카드 결제를 지원합니다. 사업자 고객의 경우 세금계산서 발행과 월 정산도 가능합니다."
          />
          <FAQItem
            q="추가 조사나 보충 요청이 가능한가요?"
            a="리포트 전달 후 1회 보충 조사를 무료로 제공합니다. 추가 범위의 조사가 필요한 경우 별도 견적을 안내해 드립니다."
          />
          <FAQItem
            q="리포트는 어떤 형태로 받나요?"
            a="PDF 또는 엑셀 형태의 상세 리포트로 전달됩니다. 상품 사진, 가격 비교, 공급처 정보, 트렌드 데이터 등이 포함됩니다."
          />
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer
        id="footer"
        style={{
          padding: "60px 40px 40px",
          borderTop: `1px solid ${C.border}`,
          background: C.dark,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 40, marginBottom: 40 }}>
            <div style={{ maxWidth: 300 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                <span style={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 22, color: C.accent }}>Y</span>
                <span style={{ fontFamily: "'Sora'", fontWeight: 800, fontSize: 22, color: C.text }}>-POP</span>
              </div>
              <p style={{ fontFamily: "'Noto Sans KR'", fontSize: 13, color: C.muted, lineHeight: 1.8 }}>
                중국 시장조사 대행 전문 파트너
                <br />
                트렌드 분석부터 공장 조사까지 한 번에 해결합니다.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: "'Noto Sans KR'", fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 14 }}>
                고객센터
              </h4>
              <p style={{ fontFamily: "'Sora'", fontWeight: 700, fontSize: 22, color: C.accent, marginBottom: 8 }}>
                070-1234-5678
              </p>
              <p style={{ fontFamily: "'Noto Sans KR'", fontSize: 13, color: C.muted, lineHeight: 1.8 }}>
                평일 09:00 ~ 18:00 (점심 12:30 ~ 13:30)
                <br />
                이메일: contact@y-pop.kr
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: "'Noto Sans KR'", fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 14 }}>
                바로가기
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[["서비스 소개", "services"], ["이용방법", "howto"], ["요금 안내", "pricing"], ["조사 대행 신청", "request"], ["FAQ", "faq"]].map(([l, id]) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: C.muted,
                      fontFamily: "'Noto Sans KR'",
                      fontSize: 13,
                      cursor: "pointer",
                      textAlign: "left",
                      padding: 0,
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24 }}>
            <p style={{ fontFamily: "'Noto Sans KR'", fontSize: 12, color: `${C.muted}88`, lineHeight: 1.8, textAlign: "center" }}>
              상호: Y-POP (와이팝) | 사업자 등록번호: 000-00-00000 | 대표: 홍길동
              <br />
              통신판매 신고번호: 제 0000-서울강남-0000호 | 이메일: contact@y-pop.kr
              <br />
              © 2026 Y-POP. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ═══ Floating CTA (mobile) ═══ */}
      <div
        className="mobile-only"
        style={{
          position: "fixed",
          bottom: 20,
          left: 16,
          right: 16,
          zIndex: 900,
          display: "none",
        }}
      >
        <button
          className="cta-btn"
          onClick={() => scrollTo("request")}
          style={{
            width: "100%",
            justifyContent: "center",
            borderRadius: 14,
            padding: "14px 0",
          }}
        >
          조사 대행 신청하기
        </button>
      </div>
    </div>
  );
}
