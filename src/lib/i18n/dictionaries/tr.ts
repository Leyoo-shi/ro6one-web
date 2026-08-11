import type { Dictionary } from './en';

/**
 * Turkish copy is written, not translated: the English source is treated as
 * intent, and each string is re-expressed the way a Turkish engineering team
 * would actually say it. Sentence structure deliberately differs from English
 * where a literal translation would read like machine output.
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
		backToTop: 'Yukarı dön'
	},

	nav: {
		about: 'Hakkımızda',
		robotics: 'Robotik',
		impact: 'Etki',
		team: 'Ekip',
		partners: 'Paydaşlar',
		contact: 'İletişim'
	},

	hero: {
		eyebrow: 'FRC TAKIMI #11919',
		titleTop: 'Sıradakini',
		titleBottom: 'inşa et.',
		description: 'Tasarlıyoruz, üretiyoruz, yarışıyoruz — ama iş tek bir sezonda bitmiyor.',
		meta: {
			season: 'Sezon',
			team: 'Takım'
		},
		scroll: 'Keşfetmek için kaydır'
	},

	departments: {
		mechanical: {
			name: 'Mekanik',
			description:
				'Şasi, hareket sistemi ve mekanizmalar: konsept çiziminden maçtan sağlam çıkan parçaya kadar.'
		},
		design: {
			name: 'CAD ve Tasarım',
			description:
				'Tam montaj CAD’i, tolerans kararları ve atölyenin gerçekten üzerinden ürettiği teknik resimler.'
		},
		software: {
			name: 'Yazılım',
			description:
				'Robot kontrolü, algılama ve sürücü arayüzleri; ayrıca takımın günlük işini yürüten iç araçlar.'
		},
		electrical: {
			name: 'Elektrik ve Elektronik',
			description:
				'Güç dağıtımı, kablolama disiplini, sensörler ve arızayı bir sonraki maçtan önce bulmak.'
		},
		media: {
			name: 'Medya ve İletişim',
			description:
				'Fotoğraf, video, kimlik ve dokümantasyon: işin başkaları için okunur hâle gelmesi.'
		},
		operations: {
			name: 'Organizasyon',
			description: 'Planlama, lojistik, paydaş ilişkileri ve planı üretime çeviren bütçe.'
		}
	},

	home: {
		identity: {
			label: 'Kimiz',
			title: 'Mühendislik organizasyonu gibi çalışan bir robotik takımı.',
			body: [
				'RO6ONE, Trabzon merkezli bir FIRST Robotics Competition takımı. Her sezon bir yarışma robotu tasarlayıp üretiyoruz; bir yandan da sıradaki üretimi bir öncekinden iyi yapacak sistemleri, dokümantasyonu ve alışkanlıkları kuruyoruz.',
				'Çizim, inceleme, prototip, ölçüm, hata, revizyon. Robot görünen sonuç; asıl inşa ettiğimiz şey süreç.'
			],
			principles: [
				{
					term: 'STEAM for STEM',
					gloss:
						'Tasarım, iletişim ve zanaat birer mühendislik aracı; en sona eklenen bir süs değil.'
				},
				{
					term: 'STEM for People',
					gloss: 'Teknoloji, atölyenin dışındaki birine ulaştığında tamamlanmış olur.'
				}
			]
		},
		disciplines: {
			label: 'Nasıl çalışıyoruz',
			title: 'Tek bir makine, uyuşmak zorunda olan altı disiplin.',
			lede: 'Bir sezon, mekanik bir problem olmadan önce bir entegrasyon problemi. Ortada buluşmak zorunda olan gruplar şunlar.'
		},
		continuity: {
			label: 'Sezonun ötesinde',
			title: 'Sezon biter. İş bitmez.',
			body: 'Yarışmalar arasında prototip üretiyoruz, araçlarımızı yeniden kuruyoruz, öğrendiklerimizi yazıya geçiriyoruz ve sıradaki üretimi yürütecek kişileri yetiştiriyoruz. Süreklilik şans değil; bir tasarım kararı.',
			items: [
				{
					name: 'Prototipleme',
					description: 'Fikirler, sezon taahhüdüne dönüşmeden çok önce düşük maliyetle sınanır.'
				},
				{
					name: 'Dokümantasyon',
					description: 'Kararlar, gerekçesi hâlâ tazeyken yazıya geçer.'
				},
				{
					name: 'Devir',
					description: 'Her rolün, ihtiyaç doğmadan önce o rolü öğrenmiş bir devralanı var.'
				}
			]
		},
		impact: {
			label: 'Etki',
			title: 'Atölyeden çıkan mühendislik.',
			body: '“STEAM for STEM” ve “STEM for People” duvara asılan sloganlar değil. İşimizin nerede karşılık bulmasını istediğimizi anlatıyorlar: sınıflarda, başka takımların pit alanlarında, onu üretmemiş insanların elinde.',
			link: 'Etki yaklaşımımız'
		},
		team: {
			label: 'Ekip',
			title: 'Bir takım, bir organizasyondur.',
			body: 'Bölümler, devirler, incelemeler, mentorluk. İşi öğrenciler yürütüyor; yapı da bunu mümkün kılıyor.',
			link: 'Yapımıza bakın'
		},
		partners: {
			label: 'Paydaşlar',
			title: 'Sezonları mümkün kılan şey, takımın dışındaki insanlar.',
			body: 'Malzeme, işleme zamanı, takım-tezgâh, ulaşım, mentorluk, bütçe. Trabzon’da mühendislik eğitimini desteklemek istiyorsanız bunun somut bir yolu var.',
			link: 'Destek yolları'
		},
		contact: {
			label: 'İletişim',
			title: 'Bize yazın.',
			body: 'Takımı desteklemek, birlikte bir şey üretmek ya da yalnızca bir işi nasıl yaptığımızı sormak için.',
			link: 'İletişime geçin'
		}
	},

	about: {
		eyebrow: 'Hakkımızda',
		title: 'Her sezon bir robot, her an bir organizasyon kuruyoruz.',
		lede: 'RO6ONE Robotics, Trabzon merkezli FRC #11919 takımı. Bu sayfa işe nasıl baktığımızı anlatıyor.',
		story: {
			title: 'Kısa hâli',
			body: [
				'Bir FIRST Robotics Competition sezonu takıma yoğun birkaç hafta veriyor: yeni bir oyun, yeni kısıtlar ve belirli bir tarihte var olmak zorunda olan bir makine. Sıkı bir takvime bağlanmış bir mühendislik problemi.',
				'Bu tarihi amaç değil, zorlayıcı bir mekanizma olarak görüyoruz. Sezonun ürettiği şey robot; bizde kalan şey yöntem — kararların nasıl alındığı, parçaların nasıl belgelendiği, yeni birinin iki ay değil iki haftada nasıl faydalı hâle geldiği.',
				'Bu site de bu yüzden var. Yazılmayan iş, yeniden keşfedilmek zorunda kalan iştir.'
			]
		},
		frc: {
			title: 'FRC nedir, bağlamıyla',
			body: [
				'FIRST Robotics Competition uluslararası bir lise programı: takımlara bir oyun ve sınırlı bir üretim süresi veriliyor, ardından bölgesel etkinliklerde yarışıyorlar. Robot büyük bir beyaz eşya boyutunda ve hızla başka robotların üzerine sürülmeye dayanmak zorunda.',
				'Program aynı zamanda robotun etrafındaki her şeyle ilgili: sosyal etki, dokümantasyon, güvenlik, iletişim ve takımı tek bir mezun kuşağın ötesinde ayakta tutmak.'
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
					name: 'Önce bitir, sonra iyileştir',
					description:
						'Maç günü çalışan bir alt sistem, zarif ama bitmemiş olanı her seferinde geçer.'
				},
				{
					name: 'İşi anlat',
					description:
						'Bir tasarım kararını takım dışından birine anlatamıyorsak, onu henüz anlamamışız demektir.'
				}
			]
		},
		organisation: {
			title: 'Yapı',
			body: 'Takım, üretimin bir parçasını üstlenen disiplinlere ayrılıyor; kesiştikleri yerlerde ortak incelemeler yapılıyor. Roller bilinçli olarak devredilir; böylece bir öğrenci mezun olduğunda bilgi takımdan çıkmaz.',
			cta: 'Bölümleri görün'
		}
	},

	robotics: {
		eyebrow: 'Robotik',
		title: 'Makine ve çalışması için doğru olması gereken her şey.',
		lede: 'Yarışma robotları, prototipler, yazılım ve bunların etrafındaki araçlar.',
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
				title: 'Dokümantasyon hazırlanıyor',
				body: 'Proje kayıtları üretim notlarından yazılıyor. Bu dizin tek bir içerik dosyasını okuyor ve kayıtlar eklendikçe doluyor.'
			}
		}
	},

	impact: {
		eyebrow: 'Etki',
		title: 'STEAM for STEM. STEM for People.',
		lede: 'Mühendisliğin kimin için olduğu konusunda kendimizi dürüst tutmak için kullandığımız iki ifade.',
		steam: {
			title: 'STEAM for STEM',
			body: 'STEM’e sanatı ve tasarımı eklemek süsleme değil. Çizmek, yazmak, çekmek ve anlatmak; teknik işin anlaşılır hâle gelme biçimi — ve tasarım için gelen bir öğrencinin sonunda statik öğrenme biçimi.'
		},
		people: {
			title: 'STEM for People',
			body: 'Yalnızca başka robotik takımlarını etkileyen bir robotun izleyicisi azdır. İşin, hayatında hiç pit alanına girmeyecek insanlar için de kullanışlı olmasını istiyoruz: ne okuyacağına karar veren öğrenciler, materyal arayan öğretmenler, atölyede ne olduğunu merak eden komşular.'
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
					name: 'Sorumlu üretim',
					description:
						'Malzemenin yeniden kullanımı, tamir edilebilirlik ve bir üretimin gerçek maliyetinin dürüst hesabı.'
				}
			]
		},
		record: {
			title: 'Program kayıtları',
			body: 'Tek tek atölyeler, ziyaretler ve iş birlikleri; belgelendikçe tarihleriyle ve gerçekte ne yapıldığıyla birlikte burada listelenecek.'
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
		lede: 'RO6ONE; sorumlulukları net, kesişimleri bilinçli disiplinlere ayrılmış durumda.',
		structure: {
			title: 'Bölümler',
			lede: 'Her bölüm üretimin bir parçasını üstleniyor ve ortak incelemelerde hesap veriyor.'
		},
		roster: {
			title: 'Üyeler',
			lede: 'Profiller her sezon güncelleniyor.',
			empty: {
				title: 'Üye profilleri hazırlanıyor',
				body: 'Bu bölüm tek bir içerik dosyasından üretiliyor. İsimler, roller ve fotoğraflar eklendiğinde kartlar burada bölümlere göre gruplanarak görünecek.'
			}
		},
		join: {
			title: 'Takıma katılmak',
			body: 'Trabzon’da bir şeyler üretmek isteyen bir öğrenciysen bize yaz. Burada tasarım, yazı, çekim, bütçe ve organizasyon; talaşlı imalat kadar önemli.',
			cta: 'Takımla iletişime geçin'
		}
	},

	partners: {
		eyebrow: 'Paydaşlar',
		title: 'Destek, planı bir makineye dönüştürür.',
		lede: 'FRC’de paydaşlık, reklamdan çok endüstriyel iş birliğine yakın.',
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
			title: 'Mevcut paydaşlar',
			lede: 'İçinde bulunduğumuz sezonu destekleyen kurumlar.',
			empty: {
				title: 'Bu liste takım tarafından güncelleniyor',
				body: 'Paydaş adları, logoları ve açıklamaları tek bir içerik dosyasından geliyor. Bir paydaşlık teyit edilmeden burada hiçbir şey görünmüyor.'
			}
		},
		pack: {
			title: 'Destek dosyası',
			body: 'İndirilebilir paydaşlık dosyası tamamlandığında buraya eklenecek.'
		},
		cta: {
			title: 'Konuşmaya başlayalım',
			body: 'Neyi sunabileceğinizi yazın; tam olarak nereye gittiğini anlatalım.',
			action: 'İletişime geçin'
		}
	},

	contact: {
		eyebrow: 'İletişim',
		title: 'İletişime geçin.',
		lede: 'Takıma ulaşmanın doğrudan yolları.',
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
			emailLabel: 'E-posta',
			emailPending: 'Buraya herkese açık bir adres eklenecek.',
			locationLabel: 'Merkez',
			socialLabel: 'Diğer kanallar',
			socialPending: 'Resmî hesaplar teyit edildiğinde burada bağlanacak.'
		},
		form: {
			title: 'Mesaj yazın',
			note: 'Bu form mesajı kendi e-posta uygulamanızda oluşturur. Bu sayfadan hiçbir şey gönderilmez ve hiçbir veri saklanmaz.',
			name: 'Adınız',
			email: 'E-posta adresiniz',
			subject: 'Konu',
			message: 'Mesajınız',
			submit: 'E-posta uygulamasında aç',
			unavailable:
				'Henüz herkese açık bir iletişim adresi yayınlanmadı, bu yüzden form şimdilik devre dışı. Adres eklendiği anda etkinleşecek.',
			optional: 'İsteğe bağlı'
		}
	},

	footer: {
		explore: 'Keşfet',
		connect: 'Bağlan',
		identity: 'Kimlik',
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
			title: 'RO6ONE Robotics — FRC Takımı #11919',
			description:
				'RO6ONE Robotics, Trabzon’dan FIRST Robotics Competition #11919 takımı. Tasarlıyoruz, üretiyoruz, yarışıyoruz — ve iş tek bir sezonda bitmiyor.'
		},
		about: {
			title: 'Hakkımızda',
			description:
				'Trabzon’dan FRC #11919 takımı RO6ONE Robotics’in mühendisliğe, dokümantasyona ve sezonlar arası sürekliliğe yaklaşımı.'
		},
		robotics: {
			title: 'Robotik',
			description:
				'Yarışma robotları, prototipler, yazılım ve araçlar: bir RO6ONE üretiminin oyunu okumaktan sezon sonu değerlendirmesine kadar izlediği yol.'
		},
		impact: {
			title: 'Etki',
			description:
				'STEAM for STEM, STEM for People — RO6ONE Robotics’in sosyal etki, açık dokümantasyon ve atölyeden çıkan mühendisliğe bakışı.'
		},
		team: {
			title: 'Ekip',
			description:
				'RO6ONE Robotics’i oluşturan bölümler: mekanik, CAD ve tasarım, yazılım, elektrik-elektronik, medya ve organizasyon.'
		},
		partners: {
			title: 'Paydaşlar',
			description:
				'Trabzon’daki FRC #11919 takımını desteklemenin yolları: malzeme, işleme, takım-tezgâh, lojistik, mentorluk ve finansal destek.'
		},
		contact: {
			title: 'İletişim',
			description:
				'Trabzon merkezli FRC #11919 takımı RO6ONE Robotics’e ulaşın — destek, iş birliği, atölyeler ya da takıma katılmak için.'
		}
	}
};
