import type { Dictionary } from './en';

/**
 * Turkish copy is written, not translated: the English source is treated as
 * intent, and each string is re-expressed the way this team would actually say
 * it. Sentence structure deliberately differs from English where a literal
 * rendering would read like machine output.
 *
 * Proper nouns stay in their official form (Trabzon Merkez Fen Lisesi, Hayri
 * Gür Spor Salonu, Spor STEAM Fest ’26), and the two brand principles stay in
 * English in both languages because that is how the team uses them.
 */
export const tr: Dictionary = {
	common: {
		skipToContent: 'İçeriğe geç',
		primaryNavLabel: 'Ana menü',
		footerNavLabel: 'Alt menü',
		menuTitle: 'Menü',
		menuOpen: 'Menüyü aç',
		menuClose: 'Menüyü kapat',
		languageLabel: 'Dil',
		backToTop: 'Yukarı dön',
		people: 'kişi'
	},

	nav: {
		about: 'Hakkımızda',
		robotics: 'Robotik',
		impact: 'Etki',
		team: 'Ekip',
		partners: 'Paydaşlar',
		contact: 'İletişim'
	},

	media: {
		categories: {
			team: 'Takım arşivi',
			steamfest: 'Spor STEAM Fest ’26',
			offseason: 'Trabzon Off-Season',
			infrastructure: 'Altyapı',
			robotics: 'Atölye',
			trabzonspor: 'Kurumsal',
			brand: 'Marka'
		}
	},

	hero: {
		eyebrow: 'Trabzonspor Ro6one Robotics',
		titleTop: 'Sıradakini',
		titleBottom: 'inşa et.',
		description:
			'Şubat 2026’da Trabzon Merkez Fen Lisesi’nde kurulduk. Robotu da, etrafındaki organizasyonu da biz kuruyoruz.',
		meta: {
			founded: 'Kuruluş',
			foundedValue: 'Şubat 2026',
			home: 'Yuva',
			next: 'Sırada',
			nextValue: 'İlk resmî sezon'
		},
		scroll: 'Aşağı kaydır'
	},

	roles: {
		robotics: 'Robotik',
		pr: 'PR',
		organisation: 'Organizasyon',
		finance: 'Finans',
		mentor: 'Mentör / Baş Koç'
	},

	daily: {
		label: 'Bugün',
		months: [
			'Ocak',
			'Şubat',
			'Mart',
			'Nisan',
			'Mayıs',
			'Haziran',
			'Temmuz',
			'Ağustos',
			'Eylül',
			'Ekim',
			'Kasım',
			'Aralık'
		],
		birthday: {
			label: 'Doğum günü',
			wish: 'İyi ki doğdun. Atölye seninle daha iyi.',
			wishPlural: 'İyi ki doğdunuz. Atölye ikinizle daha iyi.'
		},
		signal: {
			label: 'Kayıtlardan',
			read: 'Devamı',
			nextLabel: 'Sıradaki',
			facts: {
				founded:
					'RO6ONE, Şubat 2026’da Trabzon Merkez Fen Lisesi’ndeki tek bir öğrenci havuzundan kuruldu.',
				home: 'Ev, Trabzon Merkez Fen Lisesi: takımın çıktığı okul, kiraladığı bir salon değil.',
				number:
					'Takım FRC #11919 olarak yarışıyor. Numara atandı; ona dönüştürdüğümüz şey bize ait.',
				steamfest:
					'28 Nisan 2026’da takım, dört okulu tek salonda buluşturan Spor STEAM Fest’26’yı düzenledi.',
				steamfestConcept:
					'STEAMFest’te bir futbol maçı ile bir kimya gösterisi aynı öğleden sonrayı bilerek paylaştı.',
				offseason:
					'Temmuz 2026’da RO6ONE, Hayri Gür Spor Salonu’nda Trabzon Off-Season’ı organize etti.',
				offseasonTeams:
					'Yirmi bir takım, bölgede daha önce hiç yapılmamış bir FRC Off-Season için robotlarıyla Trabzon’a geldi.',
				platform:
					'Takım iletişimi, toplantılar ve dosyalar, takımın kendi kurup sürdürdüğü bir platformda çalışıyor.',
				infrastructure:
					'Alan adı, e-posta ve bu web sitesi takım tarafından işletiliyor; hizmet olarak kiralanmıyor.',
				firstSeason:
					'Yaklaşan sezon RO6ONE’ın ilk resmî FRC yarışma sezonu. Şimdiye kadarki her şey ondan önce oldu.',
				steamForStem:
					'STEAM for STEM: çizmek, yazmak ve çekmek, teknik işin anlaşılır hâle gelme biçimidir.',
				stemForPeople:
					'STEM for People: teknoloji, atölyenin dışındaki birine ulaştığında tamamlanır.'
			}
		}
	},

	departments: {
		mechanical: {
			name: 'Mekanik',
			description:
				'Şasi, hareket sistemi ve mekanizmalar: konsept çiziminden maçtan sağlam çıkan parçaya kadar.'
		},
		cad: {
			name: 'CAD',
			description:
				'Tam montaj modelleme, tolerans kararları ve atölyenin gerçekten üzerinden ürettiği teknik resimler.'
		},
		electrical: {
			name: 'Elektrik ve Elektronik',
			description:
				'Güç dağıtımı, kablolama disiplini, sensörler ve arızayı bir sonraki maçtan önce bulmak.'
		},
		software: {
			name: 'Yazılım',
			description:
				'Robot kontrolü, algılama ve sürücü arayüzleri; ayrıca takımın günlük işini yürüten iç araçlar.'
		}
	},

	organization: {
		hint: 'Bir alan seçin',
		flex: {
			name: 'İhtiyaca Göre Görev',
			description:
				'İşin olduğu yere giden esnek kapasite: üretim günleri, etkinlik operasyonu, çekim, hazırlık. Bir departman değil; bütün ağın içinde durduğu alan.'
		},
		domains: {
			engineering: {
				name: 'Mühendislik',
				description:
					'Mekanik, CAD, elektrik ve yazılım. Makineyi ve onu şekillendiren kararları üstlenir.'
			},
			operations: {
				name: 'Organizasyon',
				description:
					'Takımı hizada tutar: koordinasyon, planlama, kararlar, takip ve bir üretim haftasını yaşanabilir kılan iç destek.'
			},
			media: {
				name: 'Medya',
				description:
					'Önce kayıt üzerine kurulu bir hat. Bir operatör arşivi sürekli büyütür, yönetim hangi hikâyelerin üretileceğine karar verir, iki kameracı o hikâyelerin ihtiyacını çeker, iki kurgucu uzun ve kısa formu ayrı ayrı toparlar.',
				roles: {
					capture: 'Kayıt — tek operatör, sürekli arşiv',
					direction: 'Yönetim — neyin üretileceğine karar verir',
					camera: 'İki kameracı — brief’e göre çeker',
					edit: 'İki kurgucu — uzun form ve kısa form'
				}
			},
			pr: {
				name: 'PR liderleri',
				description:
					'Sosyal medya hesabı değil. Fırsatı bulan, fikri şekillendiren, kurumla iletişime geçen, kaba bir plan çıkaran, takıma sunan ve sonra işi en uygun kişiye devreden üç kişi.'
			},
			creative: {
				name: 'Kreatif ve Hazırlık',
				description:
					'RO6ONE’ı dışarıda görünür kılan fikirler — seminerler, atölyeler, etkinlik alanları — ve o fikirlerin ihtiyaç duyduğu fiziksel malzemenin günü gelmeden hazırlanması.'
			},
			sponsorship: {
				name: 'Sponsorluk',
				description:
					'Şirketleri, vakıfları ve kurumları araştırır, görüşmeleri ayarlar; malzeme, ayni ve finansal desteğe giden yolu açar.'
			},
			finance: {
				name: 'Finans',
				description: 'Geliri, gideri ve nakit akışını takip eder; üçünü de görünür tutar.'
			}
		},
		pipeline: {
			title: 'Bir proje nasıl başlar',
			stages: {
				spot: 'Fark et',
				shape: 'Şekillendir',
				reach: 'İletişime geç',
				plan: 'Planla',
				decide: 'Takım karar verir',
				handOver: 'Devret'
			},
			note: 'Projeyi bulan kişinin, projeyi yürüten kişi olması gerekmiyor.'
		},
		platform: {
			kicker: 'İç platform',
			name: 'Ekip Ro6one',
			description:
				'Takım iletişimi, toplantılar ve dosyalar kendi kurduğumuz Nextcloud tabanlı ortamda yürüyor. Nextcloud’u biz yazmadık; onu yapılandırıyor, kendi geliştiricilerimizin yazdığı eklentilerle genişletiyor, loglarını kendi araçlarımızla yönetiyoruz. Alan adı, e-posta ve bu web sitesi de kendi işlettiğimiz altyapıda çalışıyor.',
			facts: {
				comms: 'Takım iletişimi',
				meetings: 'Toplantılar',
				mail: 'Kendi e-posta alan adımız',
				site: 'Bu web sitesi'
			}
		}
	},

	events: {
		facts: {
			date: 'Tarih',
			schools: 'Okul',
			teams: 'Takım',
			role: 'Rolümüz',
			venue: 'Mekân',
			support: 'Sponsor',
			organiser: 'Organizatör'
		},
		coverageLabel: 'Kaynak',
		steamfest: {
			label: 'Spor STEAM Fest ’26',
			title: 'Aynı anda iki yarışma yürüten bir spor salonu.',
			lede: 'Dört okul. Bir futbol turnuvası, bir voleybol turnuvası ve maç aralarında bir kat dolusu STEM standı.',
			court: {
				title: 'Saha',
				items: ['Erkekler futbol turnuvası', 'Kızlar voleybol turnuvası', 'Dört okul, tek tribün']
			},
			lab: {
				title: 'Laboratuvar',
				items: [
					'TÜBİTAK ve TEKNOFEST projeleri',
					'Kimya ve biyoloji standları',
					'Mühendislik sergileri ve çizgi izleyen robotlar',
					'Matematik standları',
					'Aralarda kimya ve fizik gösterileri'
				]
			},
			merge: {
				title: 'Kesiştikleri yer',
				body: 'Amaç, bir turnuvanın yanına usulca bilim fuarı kurmak değildi. Maç için gelen öğrenci kendini bir kimya gösterisinin önünde buldu; standlar için gelen öğrenci sahaya çıktı. “STEAM for STEM” pratikte tam olarak bu çarpışma demek.'
			},
			support:
				'Trabzonspor sponsorluğunda, RO6ONE tarafından Trabzon Merkez Fen Lisesi’nde düzenlendi.',
			schoolsLabel: 'Katılan okullar'
		},
		offseason: {
			label: 'Trabzon Off-Season',
			title: '21 takım Trabzon’a geldi.',
			lede: 'Temmuz 2026, Hayri Gür Spor Salonu — Karadeniz Bölgesi’nde düzenlenen ilk FRC Off-Season; organizasyonu beş aylık bir takım üstlendi.',
			body: [
				'Türkiye’de FRC ağırlıkla tek bir hat üzerinde büyüdü: İstanbul, Ankara, İzmir. Bu kez İstanbul, Ankara, Bursa, Kocaeli ve Trabzon’dan takımlar robotlarını doğuya getirdi; bir spor salonunun içine kurulan tam sahaya.',
				'Takımlar işin yalnızca yarısıydı. İçeri giren yerel öğrencilerin, ailelerin ve çocukların çoğu için bir FRC sahası ilk kez ulaşılabilir mesafedeydi — ve etkinlik ulusal basında yer aldı.'
			],
			originsLabel: 'Geldikleri şehirler',
			proof: {
				title: 'Kanıtladığı şey',
				body: 'İlk olmamız değil. Haritanın üç şehirden ibaret olmadığı ve bir takım kurmaya karar verdiği anda bir bölgenin bunu ağırlayabildiği.'
			},
			mascot: 'Etkinliğin, yalnızca o üç gün için hazırlanmış kendi maskotu vardı.'
		}
	},

	home: {
		origin: {
			label: 'Kuruluş',
			month: 'Şubat',
			year: '2026',
			/* "…ondan sonra oldu" was flabby; Turkish drops the verb here happily. */
			title: 'Bu sitedeki her şey ondan sonra başladı.',
			body: [
				'RO6ONE, Trabzon Merkez Fen Lisesi’nde neredeyse hiç FRC deneyimi olmayan öğrencilerle başladı: geçmiş bir üretim yok, arşiv yok, devralınacak bir süreç yok. Tasarlamamız gereken ilk şey takımın kendisiydi.',
				'Martta Trabzonspor ile imzalanan iş birliği protokolü bu takıma kurumsal bir zemin verdi. Nisanda bir festival düzenledik. Temmuzda 21 takımlı bir turnuva organize ettik. İlk resmî yarışma sezonumuz ise hâlâ önümüzde.'
			],
			timelineLabel: 'Kuruluştan bu yana geçen ay',
			schoolLabel: 'Yuva'
		},
		timeline: {
			formation: { name: 'Kuruluş', note: 'Trabzon Merkez Fen Lisesi' },
			protocol: { name: 'Trabzonspor protokolü', note: 'İş birliği protokolü imzalandı' },
			steamfest: { name: 'Spor STEAM Fest ’26', note: 'Dört okul; spor ve STEM aynı salonda' },
			offseason: { name: 'Trabzon Off-Season', note: '21 takım, Hayri Gür Spor Salonu' },
			season: { name: 'İlk resmî sezon', note: 'Önümüzde' }
		},
		people: {
			label: 'Ekip',
			titleLead: 'Elli bir öğrenci,',
			titleAccent: 'tek bir iş.',
			lede: 'Portresi ulaşan herkes burada, akıp gidiyor. Diğerleri de yolda.',
			countPeople: 'kişi',
			countNote: 'Robotik, PR, organizasyon, finans — ve yanlarında, üstlerinde değil, iki mentör.',
			cta: 'Ekibin tamamı',
			hintScroll: 'Kaydırmaya devam edin',
			hintSwipe: 'Kaydırın'
		},
		monolith: {
			label: 'Takım numarası',
			assigned: 'FIRST tarafından atandı, 2026',
			pivot:
				'Yukarıdaki her şey ilk resmî sezonumuzdan önce oldu. Bundan sonrası, bunun sürmesi için kurduğumuz sistem.'
		},
		machine: {
			label: 'Makine',
			title: 'Dört disiplin, tek robot, tek teslim tarihi.',
			lede: 'İlk resmî robotumuz önümüzde. Onu nasıl üreteceğimiz ise doğaçlama değil.',
			link: 'Üretim nasıl ilerliyor'
		},
		system: {
			label: 'Organizasyon',
			title: 'Takımı da robotu kurduğumuz gibi kuruyoruz.',
			body: 'Yedi alan, bir esnek havuz ve kendi işlettiğimiz bir platform. Kimse bir kutuya kilitli değil: rol, nerede sorumlu olduğunuzu söyler; nerede çalışabileceğinizi değil.',
			link: 'Takım nasıl çalışıyor'
		},
		principles: {
			label: 'İlkeler',
			title: 'Kendimizi sürekli sınadığımız iki cümle.',
			steam: {
				term: 'STEAM for STEM',
				body: 'Tasarım, spor, film ve yazı; teknik işin, teknik iş için gelmemiş birine ulaşma yolu. Spor STEAM Fest, bu savın bir spor salonuna kurulmuş hâliydi.'
			},
			people: {
				term: 'STEM for People',
				body: 'Bir saha, yalnızca ona ulaşabilenlerin işine yarar. Trabzon’a bir saha getirmek, bizim için başkasının sahasına gitmekten daha önemliydi.'
			},
			link: 'Etkiyi ayrıntısıyla gör'
		},
		institutional: {
			label: 'Kurumsal',
			title: 'Bu şehrin zaten bildiği bir adla yarışıyoruz.',
			body: [
				'Mart 2026’da Trabzonspor ile Trabzon Merkez Fen Lisesi arasında bilim, teknoloji ve mühendislik alanında bir iş birliği protokolü imzalandı: ulusal ve uluslararası yarışmalar boyunca FRC takımına malzeme ve ayni destek, ve tek bir sezondan uzun sürmesi amaçlanan bir ilişki.',
				'Takımın adının Trabzonspor Ro6one Robotics olmasının sebebi bu; 21 takımlı bir turnuvanın burada yapılabilmesinin sebeplerinden biri de. Robotu yine de biz üreteceğiz.'
			],
			link: 'İlişkinin ayrıntısı'
		},
		contact: {
			label: 'İletişim',
			title: 'Bize yazın.',
			body: 'Şirketler, öğretmenler, öğrenciler, diğer takımlar, basın. İki adres, üç kanal ve sessizce hiçbir yere gitmeyen bir form yok.',
			link: 'İletişime geçin'
		}
	},

	about: {
		eyebrow: 'Hakkımızda',
		title: 'Robotu üretebilmek için önce kendi sürecini kurmak zorunda kalan bir takım.',
		lede: 'RO6ONE Robotics — tam adıyla Trabzonspor Ro6one Robotics — Şubat 2026’da Trabzon Merkez Fen Lisesi’nde kurulan FRC #11919 takımı.',
		story: {
			title: 'Kısa hâli',
			body: [
				'Şubat 2026’da Trabzon Merkez Fen Lisesi’nde bir grup öğrenci FIRST Robotics Competition’a girmeye karar verdi. Neredeyse hiçbirinin deneyimi yoktu. Öğrenilecek geçmiş bir üretim, bir arşiv, yazılı bir çalışma biçimi yoktu; dolayısıyla ilk mühendislik problemi makine değil, takımın kendisiydi.',
				'Mentörümüzün yönlendirmesiyle yapı hızla oturdu: sorumluluğu net disiplinler, onları hizada tutan bir organizasyon grubu ve kararları gerekçesi tazeyken yazıya geçirme alışkanlığı.',
				'Beş ay sonra dört okula bir festival düzenlemiş ve 21 takımlı bir FRC Off-Season organize etmiştik. Hâlâ resmî bir sezonda yarışmadık. Sırada o var; ve bu takımın ilk kez organize ettiği işle değil, bir puan tablosuyla ölçüleceği yer orası olacak.'
			]
		},
		home: {
			title: 'Yuva',
			body: [
				'Trabzon Merkez Fen Lisesi, takımın kurulduğu ve hâlâ çalıştığı yer. Okul bir dekor değil: öğrenci havuzu da, atölye de, ilk seyirci de aynı koridorlardan çıktı.',
				'Daha geniş kimlik Mart 2026’da geldi; Trabzonspor ile okul arasında bilim, teknoloji ve mühendislik alanında bir iş birliği protokolü imzalandı. O günden beri takım Trabzonspor Ro6one Robotics adıyla yarışıyor.'
			]
		},
		frc: {
			title: 'FRC nedir, bağlamıyla',
			body: [
				'FIRST Robotics Competition uluslararası bir lise programı: takımlara bir oyun ve sınırlı bir üretim süresi veriliyor, ardından resmî etkinliklerde yarışıyorlar. Robot büyük bir beyaz eşya boyutunda ve hızla başka robotların üzerine sürülmeye dayanmak zorunda.',
				'Program aynı zamanda robotun etrafındaki her şeyle ilgili: sosyal etki, dokümantasyon, güvenlik, iletişim ve takımı tek bir mezun kuşağın ötesinde ayakta tutmak. Yeni bir takımın hemen başlayabileceği kısım burası; biz de buradan başladık.'
			]
		},
		principles: {
			title: 'Çalışma biçimimiz',
			items: [
				{
					name: 'Kanıtla karar ver',
					description: 'Ölç, prototiple, sonra karar ver. Fikirler işlenmiş parçalardan ucuzdur.'
				},
				{
					name: 'Senden sonrakine göre tasarla',
					description: 'Kabloyu etiketle. Dosyayı düzgün adlandır. Sonucu değil, gerekçeyi de yaz.'
				},
				{
					name: 'Hatayı erken ve kartondan yap',
					description: 'En ucuz hata, malzeme pahalı hâle gelmeden önce yapılan hatadır.'
				},
				{
					name: 'Kutunun değil, alanın sahibi ol',
					description:
						'Rol, neyden sorumlu olduğunu tarif eder; dokunmana izin verilen tek işi değil.'
				},
				{
					name: 'İşi anlat',
					description:
						'Bir kararı takım dışından birine anlatamıyorsak, onu henüz anlamamışız demektir.'
				}
			]
		},
		next: {
			title: 'Sırada ne var',
			body: 'İlk resmî sezon, ilk yarışma robotu ve bu yıl başlattığımız işlerin ikinci baskısı. Aradaki her şeyi, bizden sonra gelen takım bizden hızlı olsun diye kuruyoruz.',
			cta: 'Takımın nasıl örgütlendiğini gör'
		}
	},

	robotics: {
		eyebrow: 'Robotik',
		title: 'Makine ve çalışması için doğru olması gereken her şey.',
		lede: 'İlk resmî yarışma robotumuz önümüzde. Bu sayfa, onun içinde üretileceği yapıyı anlatıyor.',
		status: {
			label: 'Üretim durumu',
			value: 'Sezon öncesi',
			note: 'Henüz resmî bir yarışma robotu yok. Bu sayfa hayalî render’larla değil, gerçek makinelerle dolacak.'
		},
		disciplines: {
			title: 'Kim neyi üretiyor',
			lede: 'Sorumluluğu net, kesişimi sürekli dört disiplin.'
		},
		subsystems: {
			title: 'Bir sezon robotu nelerden oluşur',
			lede: 'Her yıl oyun değişiyor, mekanizmalar da onunla değişiyor. Alttaki katmanlar tanıdık kalıyor.',
			items: [
				{
					name: 'Hareket sistemi',
					description: 'Kütleyi gitmesi gereken yere hızla götürmek ve orada durdurmak.'
				},
				{
					name: 'Manipülatörler',
					description:
						'Oyun neyi almamızı, taşımamızı, nişanlamamızı ya da yerleştirmemizi istiyorsa.'
				},
				{
					name: 'Güç ve kontrol',
					description:
						'Batarya, dağıtım, motor sürücüleri ve baskı altında izi sürülebilen bir kablolama.'
				},
				{
					name: 'Algılama ve otonomi',
					description:
						'Enkoderler, görüntü işleme ve durum tahmini — robotun nerede olduğunu bilmesi.'
				},
				{
					name: 'Sürücü arayüzü',
					description: 'Sistemin son milisaniyeleri: yarışma stresi altındaki bir insan.'
				}
			]
		},
		process: {
			title: 'Bir üretim nasıl ilerler',
			lede: 'Kabaca doğrusal, dürüst olmak gerekirse iteratif.',
			steps: [
				{
					name: 'Oyunu oku',
					description: 'Kısıtlar, puanlama ve kuralların gerçekten ödüllendirdiği strateji.'
				},
				{
					name: 'Konsept ve seçim',
					description: 'Çok çizim, az hayatta kalan. Kararlar gerekçeleriyle yazıya geçiyor.'
				},
				{
					name: 'CAD',
					description:
						'Malzeme kesilmeden önce tam montaj; entegrasyon problemleri ekranda yakalanıyor.'
				},
				{
					name: 'Üretim',
					description:
						'Kes, işle, yazdır, birleştir — gerçek aksini söylediğinde teknik resmi güncelle.'
				},
				{
					name: 'Entegrasyon ve test',
					description: 'Alt sistemler tek robota dönüşüyor, sonra bir şey kırılana kadar sürülüyor.'
				},
				{
					name: 'Yarışma ve değerlendirme',
					description:
						'Maçlar veri üretiyor. Değerlendirme bunu gelecek sezonun başlangıç noktasına çeviriyor.'
				}
			]
		},
		archive: {
			title: 'Proje dizini',
			lede: 'Robotlar, prototipler ve iç araçlar; sezonu ve disipliniyle birlikte.',
			meta: {
				season: 'Sezon',
				discipline: 'Disiplin',
				status: 'Durum'
			},
			status: {
				active: 'Aktif',
				prototype: 'Prototip',
				archived: 'Arşiv',
				planned: 'Planlanan'
			},
			empty: {
				title: 'Burada uydurma hiçbir şey yok',
				body: 'Kayıtlar, iş belgelendikçe sezonu, disiplini ve durumuyla birlikte görünecek. Boş bir dizin, kurgu bir dizinden daha faydalıdır.'
			}
		}
	},

	impact: {
		eyebrow: 'Etki',
		/* Türkçe burada kaynak dil: haberler zaten Türkçe yayımlandı. */
		coverage: {
			label: 'Basın',
			title: 'Haber şehirden bizden önce çıktı.',
			body: 'Off-Season’ı önce Trabzon’un yerel gazeteleri yazdı; ardından aynı ajans haberi Karadeniz’le hiçbir bağı olmayan haber merkezlerine düştü. Bir spor salonundaki robot hafta sonu Gaziantep’te, Mersin’de, Karabük’te okundu.',
			note: 'Haberlerde organizasyon ortakları olarak Trabzonspor ve Trabzon Merkez Fen Lisesi geçiyor. Okunma sayısı tutmadık, tutmayacağız da.',
			wire: 'Aynı ajans haberi',
			original: 'Kendi haberi'
		},
		title: 'STEAM for STEM. STEM for People.',
		lede: 'İki ilke ve bu ilkeleri gerçekten savunup savunmadığımızı anlamak için yaptığımız iki proje.',
		steam: {
			title: 'STEAM for STEM',
			body: 'STEM’e sanatı, tasarımı ve sporu eklemek süsleme değil. Çizmek, çekmek, yazmak ve anlatmak; teknik işin anlaşılır hâle gelme biçimi — ve başka bir şey için gelen öğrencinin sonunda statik öğrenme biçimi.'
		},
		people: {
			title: 'STEM for People',
			body: 'Yalnızca başka robotik takımlarını etkileyen bir robotun izleyicisi azdır. İşin, hayatında hiç pit alanına girmeyecek insanlar için de kullanışlı olmasını istiyoruz: ne okuyacağına karar veren öğrenciler, materyal arayan öğretmenler, atölyede ne olduğunu merak eden aileler.'
		},
		focus: {
			title: 'Odaklandığımız alanlar',
			lede: 'Sosyal etki çalışmalarımızı kurduğumuz dört alan.',
			items: [
				{
					name: 'Yaparak öğrenme',
					description: 'Çıktısı bir sunum değil, hareket eden bir şey olan uygulamalı çalışmalar.'
				},
				{
					name: 'Açık dokümantasyon',
					description: 'Çözdüğümüz şeyler, başka bir takımın kullanabileceği biçimde yazılıyor.'
				},
				{
					name: 'Takımdan takıma',
					description:
						'Türkiye’deki FRC ekosistemi bir takım kazandığında değil, takımlar birbirine mentorluk ettiğinde büyüyor.'
				},
				{
					name: 'Bölgesel erişim',
					description:
						'Alışıldık olmayan yerlerde etkinlikler, atölyeler ve sahalar. Mesafe bir erişilebilirlik problemidir.'
				}
			]
		},
		record: {
			title: 'Program kayıtları',
			body: 'Şimdiye kadar iki proje; ikisi de bu sayfada belgeli. Bundan sonraki atölyeler, ziyaretler ve iş birlikleri gerçekleştikçe tarihleriyle ve gerçekte ne yapıldığıyla buraya eklenecek — erişim rakamlarıyla değil.'
		},
		collaborate: {
			title: 'Birlikte çalışın',
			body: 'Okullar, öğretmenler, topluluklar ve diğer takımlar: birlikte üretmeye değer bir şey varsa duymak isteriz.',
			cta: 'Takımla iletişime geçin'
		}
	},

	team: {
		eyebrow: 'Ekip',
		title: 'Bu işi öğrenciler yürütüyor. Yapı da bunun nasılı.',
		lede: 'RO6ONE bir sorumluluk ağı olarak örgütlendi: net sahiplik, bilinçli kesişim ve işin olduğu yere giden insanlar.',
		structure: {
			title: 'Ağ',
			lede: 'Tek bir esnek havuzun içinde yedi alan. Alanın neyi üstlendiğini görmek için üzerine gidin.'
		},
		engineering: {
			title: 'Mühendislik disiplinleri',
			lede: 'Mühendisliğin içinde makineyi paylaşan dört disiplin var.'
		},
		platform: {
			title: 'Organizasyonu kurmak',
			lede: 'Takım, bakımını takımın yaptığı bir altyapı üzerinde çalışıyor.'
		},
		roster: {
			title: 'Üyeler',
			lead: 'Elli bir kişi.',
			accent: 'Bir alan seçin.',
			lede: 'Bir alanı açın ya da doğrudan isim arayın.',
			pending: 'Portre bekleniyor',
			searchLabel: 'İsimle ara',
			searchPlaceholder: 'İsim',
			filterAll: 'Tümü',
			resultsLabel: 'kişi görünüyor',
			noResults: 'Bu aramaya uyan kimse yok.',
			portraitNote: 'Portreler üyeler gönderdikçe ekleniyor; boş çerçeveler sezon içinde doluyor.',
			openLabel: 'Portreyi aç',
			closeLabel: 'Kapat'
		},
		join: {
			title: 'Takıma katılmak',
			body: 'Trabzon’da bir şeyler üretmek isteyen bir öğrenciysen bize yaz. Burada tasarım, yazı, çekim, bütçe ve organizasyon; talaşlı imalat kadar önemli — ve çoğu kişi bunlardan birden fazlasını yapıyor.',
			cta: 'Takımla iletişime geçin'
		}
	},

	partners: {
		eyebrow: 'Paydaşlar',
		title: 'Destek, planı bir makineye dönüştürür.',
		lede: 'Bir kurumsal ilişki, bir okul ve sonra katılacak kurumlar için ayrılmış yer.',
		institutional: {
			title: 'Trabzonspor',
			body: [
				'Mart 2026’da Trabzonspor ile Trabzon Merkez Fen Lisesi arasında bilim, teknoloji ve mühendislik alanında bir iş birliği protokolü imzalandı. Protokol, kulübün FRC takımını ulusal ve uluslararası yarışmalar boyunca malzeme ve ayni katkılarla desteklemesini öngörüyor ve ilişkiyi tek seferlik bir sponsorluk değil, sürdürülebilir bir bağ olarak tanımlıyor.',
				'Bir ay önce kurulmuş bir takım için bu protokol mümkün olanı değiştirdi. Trabzonspor Ro6one Robotics adıyla yarışmamızın sebebi bu; Temmuzda Trabzon’da bir FRC Off-Season düzenlenebilmesinin sebeplerinden biri de.'
			],
			schoolTitle: 'Trabzon Merkez Fen Lisesi',
			schoolBody:
				'Takımın kurulduğu ve hâlâ çalıştığı okul: atölye, öğrenci havuzu ve ürettiğimiz her şeyin ilk seyircisi.',
			since: 'Protokol tarihi'
		},
		why: {
			title: 'Burada paydaşlık ne demek',
			body: [
				'Bir sezon; malzeme, işleme zamanı, takım-tezgâh, elektronik, ulaşım ve bütçe istiyor. Bunların çoğu bir okul takımının kendi başına üretebileceği şeyler değil.',
				'Karşılığında paydaş; yaptığını belgeleyen, kaynağını belirten ve mühendisliği anlatabilen bir öğrenci grubu kazanıyor. Üstelik teknik işi ciddiye alan bir kitlenin karşısında görünür oluyor.'
			]
		},
		support: {
			title: 'Destek biçimleri',
			items: [
				{
					name: 'Malzeme',
					description: 'Alüminyum, polikarbon, bağlantı elemanları, filament, ham malzeme.'
				},
				{
					name: 'İşleme ve imalat',
					description: 'CNC, torna, su jeti ya da kaynak zamanına erişim.'
				},
				{
					name: 'Takım ve elektronik',
					description: 'El aletleri, ölçüm ekipmanı, motorlar, sensörler, bataryalar.'
				},
				{
					name: 'Lojistik',
					description: 'Taşıma, kargo, konaklama ve etkinlik seyahati.'
				},
				{
					name: 'Mentorluk',
					description:
						'Bir mühendisin bir öğleden sonrası, bazen bir satın alma emrinden değerlidir.'
				},
				{
					name: 'Finansal destek',
					description: 'Kayıt, etkinlik ücretleri ve kimsenin bağışlamadığı parçalar.'
				}
			]
		},
		current: {
			title: 'Destekçiler',
			lede: 'İçinde bulunduğumuz sezonu destekleyen kurumlar.',
			empty: {
				title: 'Bu liste doldurulmuyor, yayımlanıyor',
				body: 'İsimler ancak paydaşlık teyit edildiğinde ve kurum adının yazılmasından memnun olduğunda burada görünür. Devam eden görüşmeler o ana kadar gizli kalır.'
			}
		},
		pack: {
			title: 'Paydaşlık dosyası',
			body: 'İndirilebilir paydaşlık dosyası hazırlanıyor. Tamamlanana kadar bize yazın, güncel sürümü gönderelim.'
		},
		cta: {
			title: 'Konuşmaya başlayalım',
			body: 'Neyi sunabileceğinizi yazın; tam olarak nereye gittiğini anlatalım.',
			action: 'Paydaşlık başvuruları'
		}
	},

	contact: {
		eyebrow: 'İletişim',
		title: 'İletişime geçin.',
		lede: 'İki adres, üç kanal; hepsi gerçek.',
		reasons: {
			title: 'Bize kimler yazıyor',
			items: [
				{
					name: 'Şirketler ve destekçiler',
					description: 'Malzeme, işleme zamanı, mentorluk, finansal destek.'
				},
				{
					name: 'Okullar ve öğretmenler',
					description: 'Atölyeler, ziyaretler ve sınıf iş birlikleri.'
				},
				{
					name: 'Öğrenciler',
					description: 'Takıma katılmak ya da bir şeyin nasıl yapıldığını sormak.'
				},
				{
					name: 'Diğer takımlar',
					description: 'Mentorluk, yedek parça, scouting verisi, sorular.'
				}
			]
		},
		channels: {
			title: 'Doğrudan',
			generalLabel: 'Genel',
			generalNote: 'Sorular, iş birliği, basın ve diğer her şey.',
			sponsorshipLabel: 'Paydaşlık',
			sponsorshipNote: 'Sponsorluk, malzeme desteği, kurumsal iletişim.',
			locationLabel: 'Merkez',
			socialLabel: 'Kanallar',
			copy: 'Adresi kopyala',
			copied: 'Kopyalandı'
		},
		form: {
			title: 'Mesaj yazın',
			note: 'Bu form, mesajı kendi e-posta uygulamanızda taslak olarak oluşturur. Bu sayfadan hiçbir şey gönderilmez ve hiçbir veri saklanmaz.',
			name: 'Adınız',
			email: 'E-posta adresiniz',
			subject: 'Konu',
			topicLabel: 'Gideceği adres',
			message: 'Mesajınız',
			submit: 'E-posta uygulamasında aç',
			optional: 'İsteğe bağlı'
		}
	},

	footer: {
		/* Kapanış, hero’daki "Sıradakini inşa et."e cevap veriyor. */
		closing: 'Trabzon’da elli bir öğrenci,',
		closingTurn: 'sıradakini inşa ediyor.',
		explore: 'Keşfet',
		connect: 'Bağlan',
		identity: 'Kimlik',
		homeLabel: 'Yuva',
		rights: 'Tüm hakları saklıdır.',
		first:
			'FIRST®, FIRST® Robotics Competition ve FRC® isimleri FIRST®’e ait ticari markalardır. FIRST® bu siteye sponsor değildir ve siteyi onaylamamaktadır.'
	},

	error: {
		notFound: {
			title: 'Bu sayfa mevcut değil.',
			body: 'Adres yanlış yazılmış olabilir ya da sayfa henüz hazırlanmadı.'
		},
		generic: {
			title: 'Bir şeyler ters gitti.',
			body: 'Sayfa yüklenemedi. Genellikle tekrar denemek işe yarıyor.'
		},
		cta: 'Ana sayfaya dön'
	},

	seo: {
		home: {
			title: 'Trabzonspor Ro6one Robotics — FRC Takımı #11919',
			description:
				'Trabzon’dan FRC #11919 takımı. Şubat 2026’da Trabzon Merkez Fen Lisesi’nde kuruldu: Spor STEAM Fest ’26, Karadeniz’in ilk FRC Off-Season’ı ve önümüzdeki ilk resmî sezon.'
		},
		about: {
			title: 'Hakkımızda',
			description:
				'Trabzonspor Ro6one Robotics’in Şubat 2026’daki kuruluşu, Trabzon Merkez Fen Lisesi’ndeki yuvası, Trabzonspor iş birliği protokolü ve takımın çalışma biçimi.'
		},
		robotics: {
			title: 'Robotik',
			description:
				'FRC #11919 takımının ilk resmî yarışma robotunun arkasındaki disiplinler, alt sistemler ve üretim süreci.'
		},
		impact: {
			title: 'Etki',
			description:
				'Spor STEAM Fest ’26 ve Trabzon Off-Season: RO6ONE’ın FRC’yi ve STEAM’i Doğu Karadeniz’e taşıma biçimi.'
		},
		team: {
			title: 'Ekip',
			description:
				'RO6ONE’ın arkasındaki sorumluluk ağı: mühendislik, organizasyon, medya, PR, kreatif, sponsorluk ve finans — ve takımın kendi işlettiği platform Ekip Ro6one.'
		},
		partners: {
			title: 'Paydaşlar',
			description:
				'Trabzonspor iş birliği protokolü, Trabzon Merkez Fen Lisesi ve kurumların FRC #11919 takımını destekleme yolları.'
		},
		contact: {
			title: 'İletişim',
			description:
				'Trabzonspor Ro6one Robotics’e ulaşın — genel konular için iletisim@ro6one.com, paydaşlık için sponsorluk@ro6one.com.'
		}
	}
};
