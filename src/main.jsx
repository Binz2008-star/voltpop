import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { authClient } from './auth.js';
import './styles.css';

const WA_URL = 'https://wa.me/971585881180';

const copy = {
  ar: {
    navProducts: 'المنتجات', navIdeas: 'نماذج للإلهام', navStory: 'قصتنا', cart: 'العربة', cartTitle: 'عربة التسوق', cartEmpty: 'العربة فارغة الآن', cartEmptyHint: 'ستظهر منتجات VoltPop هنا عندما نضيفها.', continueShopping: 'متابعة التصفح', signIn: 'دخول', signUp: 'إنشاء حساب',
    eyebrow: 'فكرة صغيرة.. طاقة كبيرة', heroTitle: <>أفكارنا تشحن<br />المستقبل <span>بمرح!</span></>,
    heroText: 'نحن آدم وصديقه، ونحوّل حبّنا للاختراع إلى فكرة مليئة بالطاقة. قريبًا ستجدون هنا ابتكاراتنا!',
    seeProducts: 'اكتشفوا المنتجات', ourStory: 'تعرّفوا إلينا', madeBy: 'من خيال آدم وصديقه',
    orbitOne: 'فكرة جديدة', orbitTwo: 'طاقة إيجابية', orbitThree: 'قريبًا جدًا',
    productsTag: 'متجرنا الصغير', productsTitle: 'المنتجات قادمة!', productsText: 'نحن نعمل على أول ابتكاراتنا الآن. أضيفوا هذه الصفحة للمفضلة، وعودوا قريبًا لتشاهدوا ما صنعناه.',
    emptyLabel: 'المكان جاهز لأول ابتكار', emptySub: 'نضيف المنتجات هنا عندما تصبح جاهزة', contactUs: 'راسلونا على واتساب',
    ideasTag: 'نستكشف التصاميم', ideasTitle: 'نماذج تشعل الخيال', ideasIntro: 'أمثلة حقيقية لأشكال مختلفة من البطاريات المتنقلة، جمعناها لتلهم أفكارنا.', ideaCableTag: 'كابل مدمج', ideaPlugTag: 'مقبس قابل للطي', ideaMagTag: 'تصميم نحيف مغناطيسي', ideaCableText: 'كابل USB-C مدمج في الجسم لسهولة الحمل.', ideaPlugText: 'موصل USB-C صغير قابل للطي لتقليل الحاجة إلى كابل منفصل.', ideaMagText: 'تصميم مسطح يثبت مغناطيسيًا على الأجهزة المتوافقة.', ideaSource: 'شاهدوا النموذج لدى Anker', ideasDisclaimer: 'هذه نماذج من شركة Anker للاستلهام فقط وليست للبيع من VoltPop. الرسومات توضيحية وليست صورًا أصلية للمنتجات.',
    storyTag: 'من نحن؟', storyTitle: <>كل اختراع كبير<br />يبدأ بسؤال صغير.</>, storyText: 'بدأت الحكاية بفضول آدم وحبّه لصنع الأشياء مع صديقه. VoltPop مساحة نشارك فيها رحلتنا وأفكارنا، خطوة بخطوة.',
    storyCardTitle: 'نصنعها بحماس', storyCardText: 'نتعلّم، نجرّب، ونشارككم كل جديد عندما يصبح جاهزًا.',
    contactTitle: 'عندكم سؤال أو فكرة؟', contactText: 'يسعدنا أن نسمع منكم. تواصلوا مع وليّ الأمر عبر واتساب.',
    officialWhatsApp: 'واتساب الرسمي', footerLine: 'صُنع بحب وشرارة خيال ✦',
    modalLoginTitle: 'أهلًا بعودتكم!', modalRegisterTitle: 'انضمّوا إلى VoltPop', modalVerifyTitle: 'تحقّقوا من بريدكم',
    modalLoginText: 'سجّلوا الدخول لمتابعة حسابكم.', modalRegisterText: 'أنشئوا حسابًا لتكونوا أول من يعرف جديدنا.',
    verifyText: 'أرسلنا رمزًا من 6 أرقام إلى', name: 'الاسم', email: 'البريد الإلكتروني', password: 'كلمة المرور',
    code: 'رمز التحقق', passwordHint: '8 أحرف على الأقل', submitLogin: 'تسجيل الدخول', submitRegister: 'إنشاء الحساب', verify: 'تأكيد البريد',
    switchToRegister: 'ليس لديكم حساب؟ إنشاء حساب', switchToLogin: 'لديكم حساب بالفعل؟ تسجيل الدخول',
    backToLogin: 'العودة لتسجيل الدخول', resend: 'إعادة إرسال الرمز', close: 'إغلاق', logout: 'خروج', signedInAs: 'تم تسجيل الدخول باسم',
    signupSuccess: 'أُنشئ الحساب! تحققوا من بريدكم وأدخلوا الرمز المرسل إليكم.', verifySuccess: 'تم تأكيد البريد. يمكنكم تسجيل الدخول الآن.',
    resendSuccess: 'أعدنا إرسال رمز التحقق إلى بريدكم.', configError: 'إعداد الاتصال بخدمة الحسابات غير مكتمل بعد. جرّبوا لاحقًا.',
    genericError: 'تعذّر إكمال الطلب. تحققوا من البيانات وحاولوا مجددًا.', working: 'جارٍ العمل…',
  },
  en: {
    navProducts: 'Products', navIdeas: 'Inspiration', navStory: 'Our story', cart: 'Cart', cartTitle: 'Your cart', cartEmpty: 'Your cart is empty for now', cartEmptyHint: 'VoltPop creations will show up here when they’re ready.', continueShopping: 'Keep browsing', signIn: 'Log in', signUp: 'Sign up',
    eyebrow: 'A little idea. A lot of energy.', heroTitle: <>Ideas that power<br />the future <span>with fun!</span></>,
    heroText: 'We’re Adam and his friend, turning our love of inventing into an idea full of energy. Our creations are coming soon!',
    seeProducts: 'Explore products', ourStory: 'Meet the makers', madeBy: 'Dreamed up by Adam & his friend',
    orbitOne: 'Fresh idea', orbitTwo: 'Good energy', orbitThree: 'Coming soon',
    productsTag: 'Our little shop', productsTitle: 'Cool things are coming!', productsText: 'We’re working on our first creations right now. Save this page and come back soon to see what we’ve made.',
    emptyLabel: 'A spot for our first creation', emptySub: 'New creations will appear here when ready', contactUs: 'Say hi on WhatsApp',
    ideasTag: 'Design inspiration', ideasTitle: 'Ideas to spark imagination', ideasIntro: 'Real examples of different portable charger designs we gathered to inspire our ideas.', ideaCableTag: 'Built-in cable', ideaPlugTag: 'Foldable connector', ideaMagTag: 'Slim magnetic design', ideaCableText: 'A USB-C cable built into the body for easy carrying.', ideaPlugText: 'A compact foldable USB-C connector that reduces the need for a separate cable.', ideaMagText: 'A flat design that attaches magnetically to compatible devices.', ideaSource: 'See this model at Anker', ideasDisclaimer: 'These Anker models are shown for inspiration only and are not sold by VoltPop. The drawings are illustrative, not original product photos.',
    storyTag: 'Who are we?', storyTitle: <>Every big invention<br />starts with a little question.</>, storyText: 'It all began with Adam’s curiosity and his love of making things with his friend. VoltPop is where we share our journey and ideas, one step at a time.',
    storyCardTitle: 'Made with excitement', storyCardText: 'We learn, experiment, and share what’s new when it’s ready.',
    contactTitle: 'Have a question or an idea?', contactText: 'We’d love to hear from you. Contact a parent through WhatsApp.',
    officialWhatsApp: 'Official WhatsApp', footerLine: 'Made with love & a spark of imagination ✦',
    modalLoginTitle: 'Welcome back!', modalRegisterTitle: 'Join VoltPop', modalVerifyTitle: 'Check your inbox',
    modalLoginText: 'Log in to continue to your account.', modalRegisterText: 'Create an account to be first to hear our news.',
    verifyText: 'We sent a 6-digit code to', name: 'Name', email: 'Email address', password: 'Password',
    code: 'Verification code', passwordHint: 'At least 8 characters', submitLogin: 'Log in', submitRegister: 'Create account', verify: 'Verify email',
    switchToRegister: 'New here? Create an account', switchToLogin: 'Already have an account? Log in',
    backToLogin: 'Back to log in', resend: 'Resend code', close: 'Close', logout: 'Log out', signedInAs: 'Signed in as',
    signupSuccess: 'Account created! Check your email and enter the code we sent.', verifySuccess: 'Email verified. You can log in now.',
    resendSuccess: 'We sent a new verification code to your email.', configError: 'Account service setup is not complete yet. Please try again later.',
    genericError: 'We could not complete that. Check your details and try again.', working: 'Working…',
  },
};

function Bolt({ className = '' }) {
  return <svg className={className} viewBox="0 0 48 56" aria-hidden="true"><path d="M27.1 2.5 7.4 30.2a2 2 0 0 0 1.6 3.2h12.1l-2.9 20.1L40.7 26a2 2 0 0 0-1.6-3.2H26.8l.3-20.3Z" fill="currentColor" /></svg>;
}

function Mascot() {
  return (
    <svg className="mascot-svg" viewBox="0 0 420 380" role="img" aria-label="شخصية برق مرحة">
      <ellipse cx="214" cy="340" rx="130" ry="19" fill="#28245f" opacity=".12" />
      <path d="M82 201c-31 1-45-20-38-40 8-22 33-25 55-8M324 177c30-12 47 3 44 20-4 18-23 23-45 13" fill="none" stroke="#30286d" strokeWidth="12" strokeLinecap="round" />
      <path d="M121 90c0-24 20-43 45-43 13 0 24 5 32 14 9-20 29-32 52-29 26 3 43 25 41 50 25 8 41 32 39 59l-7 99c-2 37-31 66-69 66h-93c-41 0-71-31-69-71l6-92c1-23 9-42 23-53Z" fill="#7862e9" stroke="#30286d" strokeWidth="10" strokeLinejoin="round" />
      <path d="m204 95-38 64h34l-17 51 67-77h-39l25-38Z" fill="#ffe56d" stroke="#30286d" strokeWidth="8" strokeLinejoin="round" />
      <path d="M159 236c13 15 27 22 43 22 17 0 33-7 46-22" fill="none" stroke="#30286d" strokeWidth="9" strokeLinecap="round" />
      <ellipse cx="156" cy="204" rx="10" ry="13" fill="#30286d" /><ellipse cx="254" cy="204" rx="10" ry="13" fill="#30286d" />
      <path d="M98 139c-16 0-28 12-28 27 0 10 6 20 15 24M308 126c14 2 24 13 24 28 0 8-3 15-9 20" fill="none" stroke="#f78dad" strokeWidth="9" strokeLinecap="round" />
      <path d="m113 295-12 28m193-27 12 27" stroke="#30286d" strokeWidth="12" strokeLinecap="round" />
      <path d="m113 323-18 7m214-7 18 7" stroke="#30286d" strokeWidth="12" strokeLinecap="round" />
      <path d="m88 93 8-16m225 34 16-4m-211 235-11 8m192-249 8-12" stroke="#ffb34e" strokeWidth="8" strokeLinecap="round" />
      <circle cx="327" cy="84" r="10" fill="#f78dad" /><circle cx="91" cy="126" r="7" fill="#ffe56d" />
    </svg>
  );
}

function AuthModal({ language, mode, onClose, onModeChange, onSignedIn }) {
  const t = copy[language];
  const [step, setStep] = useState(mode === 'verify' ? 'verify' : 'form');
  const [isRegister, setIsRegister] = useState(mode === 'register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'Escape' && !busy) onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, busy]);

  const ensureClient = () => {
    if (authClient) return true;
    setError(t.configError);
    return false;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(''); setMessage('');
    if (!ensureClient()) return;
    setBusy(true);
    try {
      if (isRegister) {
        const { data, error: authError } = await authClient.signUp.email({ name: name.trim(), email: email.trim(), password });
        if (authError) throw authError;
        if (data?.user && !data.user.emailVerified) {
          setMessage(t.signupSuccess);
          setStep('verify');
          return;
        }
        const sessionResult = await authClient.getSession();
        if (sessionResult.data?.session?.user) onSignedIn(sessionResult.data.session.user);
        onClose();
        return;
      }
      const { data, error: authError } = await authClient.signIn.email({ email: email.trim(), password });
      if (authError) throw authError;
      const user = data?.user || data?.session?.user;
      if (user) onSignedIn(user);
      onClose();
    } catch (caught) {
      setError(caught?.message || t.genericError);
    } finally { setBusy(false); }
  };

  const onVerify = async (event) => {
    event.preventDefault();
    setError(''); setMessage('');
    if (!ensureClient()) return;
    setBusy(true);
    try {
      const { data, error: authError } = await authClient.emailOtp.verifyEmail({ email: email.trim(), otp: otp.trim() });
      if (authError) throw authError;
      if (data?.session?.user) {
        onSignedIn(data.session.user);
        onClose();
      } else {
        setMessage(t.verifySuccess);
        setStep('form'); setIsRegister(false); setOtp('');
      }
    } catch (caught) { setError(caught?.message || t.genericError); }
    finally { setBusy(false); }
  };

  const onResend = async () => {
    setError(''); setMessage('');
    if (!ensureClient()) return;
    setBusy(true);
    try {
      const { error: authError } = await authClient.sendVerificationEmail({ email: email.trim(), callbackURL: `${window.location.origin}/voltpop/` });
      if (authError) throw authError;
      setMessage(t.resendSuccess);
    } catch (caught) { setError(caught?.message || t.genericError); }
    finally { setBusy(false); }
  };

  const title = step === 'verify' ? t.modalVerifyTitle : (isRegister ? t.modalRegisterTitle : t.modalLoginTitle);
  const subtitle = step === 'verify' ? `${t.verifyText} ${email}` : (isRegister ? t.modalRegisterText : t.modalLoginText);

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget && !busy) onClose(); }}>
      <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button className="icon-button modal-close" type="button" onClick={onClose} aria-label={t.close}>×</button>
        <div className="modal-mark"><Bolt /></div>
        <p className="modal-kicker">VoltPop</p>
        <h2 id="auth-title">{title}</h2>
        <p className="modal-subtitle">{subtitle}</p>
        {step === 'verify' ? (
          <form className="auth-form" onSubmit={onVerify}>
            <label>{t.code}<input autoFocus required inputMode="numeric" autoComplete="one-time-code" maxLength="8" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} /></label>
            {message && <p className="form-message success" role="status">{message}</p>}
            {error && <p className="form-message error" role="alert">{error}</p>}
            <button className="button button-primary form-submit" disabled={busy}>{busy ? t.working : t.verify}</button>
            <button className="text-button" type="button" onClick={onResend} disabled={busy}>{t.resend}</button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={onSubmit}>
            {isRegister && <label>{t.name}<input autoFocus required autoComplete="name" minLength="2" value={name} onChange={(e) => setName(e.target.value)} /></label>}
            <label>{t.email}<input autoFocus={!isRegister} required type="email" autoComplete="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
            <label>{t.password}<input required type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} minLength={isRegister ? 8 : undefined} value={password} onChange={(e) => setPassword(e.target.value)} />{isRegister && <span className="field-hint">{t.passwordHint}</span>}</label>
            {message && <p className="form-message success" role="status">{message}</p>}
            {error && <p className="form-message error" role="alert">{error}</p>}
            <button className="button button-primary form-submit" disabled={busy}>{busy ? t.working : (isRegister ? t.submitRegister : t.submitLogin)}</button>
            <button className="text-button" type="button" onClick={() => { setError(''); setMessage(''); setIsRegister(!isRegister); onModeChange(isRegister ? 'login' : 'register'); }}>{isRegister ? t.switchToLogin : t.switchToRegister}</button>
          </form>
        )}
        {step === 'verify' && <button className="text-button" type="button" onClick={() => { setStep('form'); setError(''); setMessage(''); }}>{t.backToLogin}</button>}
      </section>
    </div>
  );
}

function CartPanel({ language, onClose }) {
  const t = copy[language];
  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <button className="icon-button modal-close" type="button" onClick={onClose} aria-label={t.close}>×</button>
        <div className="cart-empty-icon" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M8 10h5l4.5 22h19l5-16H16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="21" cy="39" r="2.7" fill="currentColor"/><circle cx="35" cy="39" r="2.7" fill="currentColor"/><path d="m23 21 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
        <p className="modal-kicker">VoltPop</p>
        <h2 id="cart-title">{t.cartTitle}</h2>
        <p className="modal-subtitle">{t.cartEmpty}<br />{t.cartEmptyHint}</p>
        <button className="button button-primary form-submit" type="button" onClick={onClose}>{t.continueShopping}</button>
      </section>
    </div>
  );
}

function InspirationArt({ kind }) {
  if (kind === 'plug') return <svg viewBox="0 0 240 160" aria-hidden="true"><ellipse cx="122" cy="140" rx="58" ry="9" fill="#30286d" opacity=".12"/><rect x="66" y="42" width="110" height="84" rx="25" fill="#b8aaff" stroke="#30286d" strokeWidth="5"/><rect x="101" y="26" width="40" height="27" rx="7" fill="#ffe568" stroke="#30286d" strokeWidth="4"/><path d="M111 29v-8m20 8v-8" stroke="#30286d" strokeWidth="4" strokeLinecap="round"/><circle cx="91" cy="84" r="5" fill="#7965e8"/><circle cx="108" cy="84" r="5" fill="#7965e8"/><circle cx="125" cy="84" r="5" fill="#7965e8"/><circle cx="142" cy="84" r="5" fill="#7965e8"/><path d="m154 107 9-8" stroke="#7965e8" strokeWidth="4" strokeLinecap="round"/><path d="m48 54 6-11m132 83 8 7" stroke="#f59ab5" strokeWidth="5" strokeLinecap="round"/></svg>;
  if (kind === 'mag') return <svg viewBox="0 0 240 160" aria-hidden="true"><ellipse cx="119" cy="138" rx="70" ry="8" fill="#30286d" opacity=".12"/><rect x="48" y="46" width="144" height="83" rx="25" fill="#f7aac4" stroke="#30286d" strokeWidth="5"/><circle cx="120" cy="86" r="25" fill="none" stroke="#fff7f1" strokeWidth="8"/><circle cx="120" cy="86" r="15" fill="none" stroke="#fff7f1" strokeWidth="3"/><path d="M179 78v17" stroke="#30286d" strokeWidth="4" strokeLinecap="round"/><circle cx="179" cy="102" r="3" fill="#30286d"/><path d="m40 43-10-8m178 3 9-7" stroke="#ffb34e" strokeWidth="5" strokeLinecap="round"/></svg>;
  return <svg viewBox="0 0 240 160" aria-hidden="true"><ellipse cx="120" cy="138" rx="61" ry="8" fill="#30286d" opacity=".12"/><rect x="61" y="46" width="117" height="83" rx="25" fill="#92caff" stroke="#30286d" strokeWidth="5"/><path d="M96 49V33c0-11 9-20 20-20h19c11 0 20 9 20 20v16" fill="none" stroke="#30286d" strokeWidth="8" strokeLinecap="round"/><path d="M155 32v15" stroke="#ffe568" strokeWidth="7" strokeLinecap="round"/><rect x="82" y="69" width="74" height="28" rx="14" fill="#d7eaff"/><path d="M95 83h4m10 0h4m10 0h4m10 0h4" stroke="#7965e8" strokeWidth="4" strokeLinecap="round"/><path d="m48 55-8-6m148 64 9 8" stroke="#f59ab5" strokeWidth="5" strokeLinecap="round"/></svg>;
}

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem('voltpop-language') || 'ar');
  const [authMode, setAuthMode] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('voltpop-language', language);
  }, [language]);

  useEffect(() => {
    let active = true;
    if (!authClient) { setSessionLoading(false); return undefined; }
    authClient.getSession().then(({ data }) => {
      if (active && data?.session?.user) setUser(data.session.user);
    }).catch(() => {}).finally(() => { if (active) setSessionLoading(false); });
    return () => { active = false; };
  }, []);

  const signOut = async () => {
    try { if (authClient) await authClient.signOut(); } finally { setUser(null); }
  };

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="VoltPop home"><span className="brand-icon"><Bolt /></span><span>Volt<span>Pop</span><small>فولت بوب</small></span></a>
        <nav className="main-nav" aria-label={language === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}>
          <a href="#products">{t.navProducts}</a><a href="#inspiration">{t.navIdeas}</a><a href="#story">{t.navStory}</a>
        </nav>
        <div className="header-actions">
          <button className="language-toggle" type="button" onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}>{language === 'ar' ? 'EN' : 'عربي'} <span aria-hidden="true">↗</span></button>
          <button className="cart-button" type="button" onClick={() => setCartOpen(true)} aria-label={`${t.cart}, 0`} title={t.cart}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.1 11.1a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 1.9-1.4L21 8H6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="20" r="1.5" fill="currentColor"/><circle cx="18" cy="20" r="1.5" fill="currentColor"/></svg><span className="cart-count">0</span></button>
          {!sessionLoading && (user ? <div className="user-actions"><span className="user-greeting">{user.name || user.email}</span><button className="button button-small button-outline" onClick={signOut}>{t.logout}</button></div> : <><button className="button button-small button-outline login-button" onClick={() => setAuthMode('login')}>{t.signIn}</button><button className="button button-small button-dark" onClick={() => setAuthMode('register')}>{t.signUp}</button></>)}
        </div>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-spark">✦</span>{t.eyebrow}</div>
            <h1>{t.heroTitle}</h1>
            <p className="hero-description">{t.heroText}</p>
            <div className="hero-actions"><a className="button button-primary" href="#products">{t.seeProducts}<span aria-hidden="true">↗</span></a><a className="button button-soft" href="#story">{t.ourStory}</a></div>
            <div className="maker-note"><span className="maker-avatars"><i>A</i><i>✦</i></span><span>{t.madeBy}</span></div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-orbit orbit-a">✦</div><div className="art-orbit orbit-b">✧</div><div className="art-orbit orbit-c">✦</div>
            <div className="mascot-stage"><div className="stage-halo"></div><Mascot /><span className="mascot-spark spark-one">✦</span><span className="mascot-spark spark-two">✧</span></div>
            <span className="floating-note note-one">{t.orbitOne}</span><span className="floating-note note-two">{t.orbitTwo}</span><span className="floating-note note-three">{t.orbitThree}</span>
          </div>
          <div className="hero-bottomline"><span></span><span>VOLTPOP · MADE TO MAKE YOU SMILE</span><span></span></div>
        </section>

        <section className="products-section section-wrap" id="products">
          <div className="section-heading"><div><p className="section-kicker"><span>✦</span>{t.productsTag}</p><h2>{t.productsTitle}</h2></div><p className="section-intro">{t.productsText}</p></div>
          <div className="empty-shop">
            <div className="empty-decoration deco-left">✧</div><div className="empty-decoration deco-right">✦</div>
            <div className="empty-icon"><span className="empty-ring ring-one"></span><span className="empty-ring ring-two"></span><Bolt /></div>
            <p className="empty-label">{t.emptyLabel}</p><p className="empty-sub">{t.emptySub}</p>
            <a className="button button-soft" href={WA_URL} target="_blank" rel="noreferrer">{t.contactUs}<span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section className="inspiration-section section-wrap" id="inspiration">
          <div className="section-heading"><div><p className="section-kicker"><span>✦</span>{t.ideasTag}</p><h2>{t.ideasTitle}</h2></div><p className="section-intro">{t.ideasIntro}</p></div>
          <div className="inspiration-grid">
            <article className="inspiration-card card-cable"><div className="model-art"><span className="model-number">01</span><InspirationArt kind="cable" /></div><p className="model-tag">{t.ideaCableTag}</p><h3>Anker Nano Power Bank<br className="model-title-break" />(30W, Built-In USB-C Cable)</h3><p className="model-description">{t.ideaCableText}</p><a href="https://www.anker.com/eu-en/products/a1259-built-in-cable-power-bank-10000mah" target="_blank" rel="noreferrer">{t.ideaSource}<span aria-hidden="true">↗</span></a></article>
            <article className="inspiration-card card-plug"><div className="model-art"><span className="model-number">02</span><InspirationArt kind="plug" /></div><p className="model-tag">{t.ideaPlugTag}</p><h3>Anker Nano Power Bank<br className="model-title-break" />(22.5W, Built-In USB-C Connector)</h3><p className="model-description">{t.ideaPlugText}</p><a href="https://www.anker.com/products/a1653-usb-c-portable-charger-5000mah" target="_blank" rel="noreferrer">{t.ideaSource}<span aria-hidden="true">↗</span></a></article>
            <article className="inspiration-card card-mag"><div className="model-art"><span className="model-number">03</span><InspirationArt kind="mag" /></div><p className="model-tag">{t.ideaMagTag}</p><h3>Anker MagGo Power Bank<br className="model-title-break" />(10K, Slim)</h3><p className="model-description">{t.ideaMagText}</p><a href="https://www.anker.com/eu-en/products/a1664-maggo-10000mah-power-bank" target="_blank" rel="noreferrer">{t.ideaSource}<span aria-hidden="true">↗</span></a></article>
          </div>
          <p className="ideas-disclaimer">{t.ideasDisclaimer}</p>
        </section>

        <section className="story-section" id="story">
          <div className="story-inner section-wrap">
            <div className="story-copy"><p className="section-kicker"><span>✦</span>{t.storyTag}</p><h2>{t.storyTitle}</h2><p>{t.storyText}</p><a className="story-link" href={WA_URL} target="_blank" rel="noreferrer">{t.contactUs}<span aria-hidden="true">↗</span></a></div>
            <div className="story-card"><div className="story-card-star">✦</div><span className="story-card-index">01 / THE SPARK</span><h3>{t.storyCardTitle}</h3><p>{t.storyCardText}</p><div className="story-card-doodles"><span>✷</span><Bolt /><span>✧</span></div></div>
          </div>
        </section>

        <section className="contact-section section-wrap">
          <div className="contact-card"><div><p className="section-kicker"><span>✦</span>{t.officialWhatsApp}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p></div><a className="whatsapp-link" href={WA_URL} target="_blank" rel="noreferrer"><span className="whatsapp-icon" aria-hidden="true">◉</span><span><small>{t.officialWhatsApp}</small><strong dir="ltr">058 588 1180</strong></span><span className="whatsapp-arrow" aria-hidden="true">↗</span></a></div>
        </section>
      </main>

      <footer className="site-footer section-wrap"><a className="brand footer-brand" href="#top"><span className="brand-icon"><Bolt /></span><span>Volt<span>Pop</span></span></a><p>{t.footerLine}</p><span className="footer-year">© VoltPop</span></footer>

      {authMode && <AuthModal key={authMode} language={language} mode={authMode} onClose={() => setAuthMode(null)} onModeChange={setAuthMode} onSignedIn={(signedInUser) => setUser(signedInUser)} />}
      {cartOpen && <CartPanel language={language} onClose={() => setCartOpen(false)} />}
    </>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
