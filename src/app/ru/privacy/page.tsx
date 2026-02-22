import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | New Build Homes Costa Blanca',
  description: 'Политика конфиденциальности New Build Homes Costa Blanca. Узнайте, как мы собираем, используем и защищаем ваши персональные данные.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru/privacy',
  },
};

export default function PrivacyPageRu() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Главная', url: 'https://newbuildhomescostablanca.com/ru/' },
    { name: 'Политика конфиденциальности', url: 'https://newbuildhomescostablanca.com/ru/privacy/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="bg-primary-900 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-4">
              <Link href="/ru/" className="hover:text-white transition-colors">Главная</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Политика конфиденциальности</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-light text-white">
              Политика конфиденциальности
            </h1>
            <p className="text-warm-300 mt-4">
              Последнее обновление: февраль 2026 г.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 prose prose-warm max-w-none">

              <h2 className="text-2xl font-semibold text-primary-900 mt-0">1. Введение</h2>
              <p className="text-warm-700">
                New Build Homes Costa Blanca (&quot;мы,&quot; &quot;наши&quot; или &quot;нас&quot;) привержены защите вашей конфиденциальности.
                Данная политика конфиденциальности объясняет, как мы собираем, используем, раскрываем и защищаем вашу информацию, когда вы
                посещаете наш веб-сайт newbuildhomescostablanca.com.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">2. Информация, которую мы собираем</h2>

              <h3 className="text-lg font-semibold text-primary-900">Персональные данные</h3>
              <p className="text-warm-700">
                Когда вы заполняете наши формы контактов или формы запросов, мы можем собирать:
              </p>
              <ul className="text-warm-700">
                <li>Имя</li>
                <li>Адрес электронной почты</li>
                <li>Номер телефона</li>
                <li>Предпочтения по недвижимости и требования</li>
                <li>Диапазон бюджета</li>
                <li>График покупки</li>
              </ul>

              <h3 className="text-lg font-semibold text-primary-900">Автоматически собираемая информация</h3>
              <p className="text-warm-700">
                Когда вы посещаете наш веб-сайт, мы можем автоматически собирать определенную информацию, включая:
              </p>
              <ul className="text-warm-700">
                <li>IP-адрес</li>
                <li>Тип и версию браузера</li>
                <li>Посещенные страницы и время, проведенное на них</li>
                <li>Ссылающийся веб-сайт</li>
                <li>Информацию об устройстве</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">3. Файлы cookie</h2>
              <p className="text-warm-700">
                Мы используем файлы cookie и аналогичные технологии отслеживания для улучшения вашего опыта просмотра веб-сайта.
                Вы можете контролировать предпочтения по файлам cookie через наш баннер согласия на использование файлов cookie.
              </p>

              <h3 className="text-lg font-semibold text-primary-900">Типы используемых нами файлов cookie</h3>
              <ul className="text-warm-700">
                <li><strong>Необходимые файлы cookie:</strong> Необходимы для надлежащего функционирования веб-сайта</li>
                <li><strong>Аналитические файлы cookie:</strong> Помогают нам понять, как посетители используют наш сайт (Google Analytics)</li>
                <li><strong>Маркетинговые файлы cookie:</strong> Используются для отслеживания посетителей на разных веб-сайтах в целях рекламы</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">4. Как мы используем вашу информацию</h2>
              <p className="text-warm-700">Мы используем собранную информацию для:</p>
              <ul className="text-warm-700">
                <li>Ответа на ваши запросы и запросы о недвижимости</li>
                <li>Отправки вам информации о свойствах, соответствующих вашим критериям</li>
                <li>Улучшения нашего веб-сайта и услуг</li>
                <li>Анализа закономерностей использования веб-сайта</li>
                <li>Выполнения юридических обязательств</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">5. Совместное использование данных</h2>
              <p className="text-warm-700">
                Мы можем делиться вашей информацией с:
              </p>
              <ul className="text-warm-700">
                <li>Застройщиками и строителями, когда вы выражаете интерес к конкретным проектам</li>
                <li>Нашими надежными партнерами (адвокатами, ипотечными консультантами) по запросу</li>
                <li>Поставщиками услуг, которые помогают нам управлять нашим веб-сайтом</li>
                <li>Юридическими органами, когда это требуется по закону</li>
              </ul>
              <p className="text-warm-700">
                Мы никогда не будем продавать вашу персональную информацию третьим лицам.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">6. Ваши права (GDPR)</h2>
              <p className="text-warm-700">
                В соответствии с Общим положением о защите данных (GDPR) вы имеете право:
              </p>
              <ul className="text-warm-700">
                <li><strong>Доступ:</strong> Запросить копию ваших персональных данных</li>
                <li><strong>Исправление:</strong> Запросить исправление неточных данных</li>
                <li><strong>Удаление:</strong> Запросить удаление ваших персональных данных</li>
                <li><strong>Ограничение обработки:</strong> Запросить ограничение способа использования ваших данных</li>
                <li><strong>Переносимость данных:</strong> Получить ваши данные в портативном формате</li>
                <li><strong>Возражение:</strong> Возразить против обработки ваших персональных данных</li>
                <li><strong>Отозвать согласие:</strong> Отозвать согласие в любой момент</li>
              </ul>
              <p className="text-warm-700">
                Чтобы воспользоваться любым из этих прав, пожалуйста, свяжитесь с нами по адресу{' '}
                <a href="mailto:info@newbuildhomescostablanca.com" className="text-accent-600 hover:underline">
                  info@newbuildhomescostablanca.com
                </a>
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">7. Безопасность данных</h2>
              <p className="text-warm-700">
                Мы реализуем надлежащие технические и организационные меры для защиты вашей персональной
                информации от несанкционированного доступа, изменения, раскрытия или уничтожения. Однако
                ни один метод передачи через Интернет не является на 100% безопасным.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">8. Хранение данных</h2>
              <p className="text-warm-700">
                Мы храним ваши персональные данные столько времени, сколько необходимо для достижения целей,
                изложенных в этой политике, если только закон не требует более длительного периода хранения. Данные запросов
                обычно хранятся в течение 3 лет после вашего последнего взаимодействия с нами.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">9. Услуги третьих сторон</h2>
              <p className="text-warm-700">
                Наш веб-сайт может использовать услуги третьих сторон, включая:
              </p>
              <ul className="text-warm-700">
                <li>Google Analytics (аналитика веб-сайта)</li>
                <li>Google Tag Manager (управление тегами)</li>
                <li>Netlify (хостинг веб-сайта и обработка форм)</li>
                <li>WhatsApp (сервис обмена сообщениями)</li>
              </ul>
              <p className="text-warm-700">
                Эти услуги имеют собственные политики конфиденциальности, регулирующие использование вашей информации.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">10. Конфиденциальность детей</h2>
              <p className="text-warm-700">
                Наш веб-сайт не предназначен для детей в возрасте до 16 лет. Мы сознательно не собираем персональную
                информацию от детей в возрасте до 16 лет.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">11. Изменения в этой политике</h2>
              <p className="text-warm-700">
                Мы можем время от времени обновлять эту политику конфиденциальности. Мы уведомим вас об изменениях,
                опубликовав новую политику конфиденциальности на этой странице и обновив дату &quot;Последнее обновление&quot;.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">12. Свяжитесь с нами</h2>
              <p className="text-warm-700">
                Если у вас есть вопросы по этой политике конфиденциальности, пожалуйста, свяжитесь с нами:
              </p>
              <ul className="text-warm-700">
                <li>Электронная почта: <a href="mailto:info@newbuildhomescostablanca.com" className="text-accent-600 hover:underline">info@newbuildhomescostablanca.com</a></li>
                <li>Телефон: <a href="tel:+34634044970" className="text-accent-600 hover:underline">+34 634 044 970</a></li>
                <li>WhatsApp: <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:underline">Отправьте нам сообщение</a></li>
              </ul>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
