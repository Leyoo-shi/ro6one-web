/**
 * English is the source dictionary: its shape defines the `Dictionary` type,
 * so every other locale is checked against it at compile time.
 *
 * Rules for editing:
 *  - Keep keys structural (`events.offseason.body`), never sentence-shaped.
 *  - Every factual statement must be either supplied by the team or verified
 *    against a public source listed in docs/content-sources.md. No awards, no
 *    placements, no attendance, no reach figures, no invented history.
 *  - RO6ONE is the protagonist of every sentence about a partnership.
 */
export const en = {
	common: {
		skipToContent: 'Skip to content',
		primaryNavLabel: 'Primary',
		footerNavLabel: 'Footer',
		menuTitle: 'Menu',
		menuOpen: 'Open menu',
		menuClose: 'Close menu',
		languageLabel: 'Language',
		backToTop: 'Back to top',
		people: 'people'
	},

	nav: {
		about: 'About',
		robotics: 'Robotics',
		impact: 'Impact',
		team: 'Team',
		partners: 'Partners',
		contact: 'Contact'
	},

	/** Labels for media apertures that have no photograph behind them yet. */
	media: {
		categories: {
			team: 'Team archive',
			steamfest: 'Spor STEAM Fest ’26',
			offseason: 'Trabzon Off-Season',
			infrastructure: 'Infrastructure',
			robotics: 'Workshop',
			trabzonspor: 'Institutional',
			brand: 'Brand'
		}
	},

	hero: {
		eyebrow: 'Trabzonspor Ro6one Robotics',
		titleTop: 'Build what',
		titleBottom: 'comes next.',
		description:
			'Formed in February 2026 at Trabzon Merkez Fen Lisesi. We build the robot — and the organization around it.',
		meta: {
			founded: 'Formed',
			foundedValue: 'February 2026',
			home: 'Home',
			next: 'Next',
			nextValue: 'First official season'
		},
		scroll: 'Scroll to explore'
	},

	departments: {
		mechanical: {
			name: 'Mechanical',
			description:
				'Structure, drivetrain and mechanisms: from concept sketch to a part that survives a match.'
		},
		cad: {
			name: 'CAD',
			description:
				'Full-assembly modelling, tolerance decisions, and the drawings the workshop actually builds from.'
		},
		electrical: {
			name: 'Electrical',
			description:
				'Power distribution, wiring discipline, sensors, and finding the fault before the next match.'
		},
		software: {
			name: 'Software',
			description:
				'Robot control, sensing and driver tooling — plus the internal tools the team runs on.'
		}
	},

	organization: {
		hint: 'Select a domain',
		flex: {
			name: 'Assign as needed',
			description:
				'Flexible capacity that moves to wherever the work is: build days, event operations, filming, preparation. Not a department — the field the whole network sits inside.'
		},
		domains: {
			engineering: {
				name: 'Engineering',
				description:
					'Mechanical, CAD, electrical and software. Owns the machine and the decisions that shape it.'
			},
			operations: {
				name: 'Operations',
				description:
					'Keeps the team aligned: coordination, planning, decisions, follow-through, and the internal support that makes a build week survivable.'
			},
			media: {
				name: 'Media',
				description:
					'A capture-first pipeline. One operator builds the archive continuously, direction decides which stories exist, a second camera pair shoots what those stories need, and two editors cut long-form and short-form separately.',
				roles: {
					capture: 'Capture — one operator, continuous archive',
					direction: 'Direction — decides what gets made',
					camera: 'Two camera operators — shoot to brief',
					edit: 'Two editors — long-form and short-form'
				}
			},
			pr: {
				name: 'PR leads',
				description:
					'Not a posting account. Three people who find an opportunity, shape it, reach the institution, sketch a plan, bring it to the team — then hand it to whoever should own it.'
			},
			creative: {
				name: 'Creative & Prepare',
				description:
					'Ideas that make RO6ONE legible in public — seminars, workshops, activations — plus the props and materials those ideas need, built before the day.'
			},
			sponsorship: {
				name: 'Sponsorship',
				description:
					'Researches companies, foundations and institutions, arranges meetings, and works toward material, in-kind and financial support.'
			},
			finance: {
				name: 'Finance',
				description: 'Tracks income, spending and financial flow, and keeps all three visible.'
			}
		},
		pipeline: {
			title: 'How a project starts',
			stages: {
				spot: 'Spot',
				shape: 'Shape',
				reach: 'Reach out',
				plan: 'Plan',
				decide: 'Team decides',
				handOver: 'Hand over'
			},
			note: 'The person who finds a project does not have to be the person who runs it.'
		},
		platform: {
			kicker: 'Internal platform',
			name: 'Ekip Ro6one',
			description:
				'Team communication, meetings and files run on our own Nextcloud-based environment. We did not write Nextcloud. We configure it, extend it with plugins our own developers wrote, manage its logs with our own tooling, and run the domain, the mail and this website on infrastructure we operate ourselves.',
			facts: {
				comms: 'Team communication',
				meetings: 'Meetings',
				mail: 'Own mail domain',
				site: 'This website'
			}
		}
	},

	events: {
		facts: {
			date: 'Date',
			schools: 'Schools',
			teams: 'Teams',
			role: 'Our role',
			venue: 'Venue',
			support: 'Sponsor',
			organiser: 'Organizer'
		},
		coverageLabel: 'Verified by',
		steamfest: {
			label: 'Spor STEAM Fest ’26',
			title: 'A sports hall running two competitions at once.',
			lede: 'Four schools. A football tournament, a volleyball tournament, and a floor of STEM stands between the matches.',
			court: {
				title: 'Court',
				items: [
					'Boys’ football tournament',
					'Girls’ volleyball tournament',
					'Four schools, one crowd'
				]
			},
			lab: {
				title: 'Lab',
				items: [
					'TÜBİTAK and TEKNOFEST projects',
					'Chemistry and biology stands',
					'Engineering exhibits and line-following robots',
					'Mathematics stands',
					'Chemistry and physics demonstrations between sessions'
				]
			},
			merge: {
				title: 'Where they meet',
				body: 'The point was never a science fair standing politely next to a tournament. A student who came for the match ended up in front of a chemistry demonstration; a student who came for the stands ended up on the court. That collision is what “STEAM for STEM” means in practice.'
			},
			support: 'Organized by RO6ONE at Trabzon Merkez Fen Lisesi, under Trabzonspor sponsorship.',
			schoolsLabel: 'Participating schools'
		},
		offseason: {
			label: 'Trabzon Off-Season',
			title: '21 teams came to Trabzon.',
			lede: 'July 2026, Hayri Gür Spor Salonu — the first FRC Off-Season held in the Black Sea Region, organized by a team five months old.',
			body: [
				'FRC in Türkiye has grown mostly along one axis: İstanbul, Ankara, İzmir. This time teams from İstanbul, Ankara, Bursa, Kocaeli and Trabzon brought their robots east instead, onto a full field built inside a sports hall.',
				'The teams were only half of it. For most of the local students, families and children who walked in, it was the first time an FRC field existed within reach — and the event was covered by national press.'
			],
			originsLabel: 'Travelled from',
			proof: {
				title: 'What it proves',
				body: 'Not that we were first. That the map is bigger than three cities, and that a region can host this the moment a team decides to build it.'
			},
			mascot: 'The event had a mascot of its own, made for those three days.'
		}
	},

	home: {
		origin: {
			label: 'Origin',
			title: 'February 2026. Everything on this site came after.',
			body: [
				'RO6ONE started at Trabzon Merkez Fen Lisesi with students who had almost no FRC experience: no build history, no archive, no process to inherit. The first thing we had to design was the team itself.',
				'In March, a cooperation protocol with Trabzonspor gave that team an institutional home. In April we ran a festival. In July we organized a 21-team tournament. Our first official competition season is still ahead of us.'
			],
			timelineLabel: 'Months since formation',
			schoolLabel: 'Home'
		},
		timeline: {
			formation: { name: 'Formation', note: 'Trabzon Merkez Fen Lisesi' },
			protocol: { name: 'Trabzonspor protocol', note: 'Cooperation agreement signed' },
			steamfest: { name: 'Spor STEAM Fest ’26', note: 'Four schools, sport and STEM in one hall' },
			offseason: { name: 'Trabzon Off-Season', note: '21 teams, Hayri Gür Spor Salonu' },
			season: { name: 'First official season', note: 'Ahead of us' }
		},
		monolith: {
			label: 'Team number',
			assigned: 'Assigned by FIRST, 2026',
			pivot:
				'Everything above happened before our first official season. What follows is the system we built so that it keeps happening.'
		},
		machine: {
			label: 'The machine',
			title: 'Four disciplines, one robot, one deadline.',
			lede: 'The first official robot is ahead of us. How we will build it is not being improvised.',
			link: 'How a build moves'
		},
		system: {
			label: 'The organization',
			title: 'We engineer the team the same way we engineer the robot.',
			body: 'Seven domains, one flexible pool, and a platform we run ourselves. Nobody is locked in a box: a role says where you are accountable, not where you are allowed to work.',
			link: 'How the team works'
		},
		principles: {
			label: 'Principles',
			title: 'Two sentences we keep testing ourselves against.',
			steam: {
				term: 'STEAM for STEM',
				body: 'Design, sport, film and writing are how technical work reaches someone who did not come for technical work. Spor STEAM Fest was that argument, held in a sports hall.'
			},
			people: {
				term: 'STEM for People',
				body: 'A field only helps the people who can reach it. Bringing one to Trabzon mattered more to us than travelling to someone else’s.'
			},
			link: 'Impact in detail'
		},
		institutional: {
			label: 'Institutional',
			title: 'We compete under a name this city already knows.',
			body: [
				'In March 2026, Trabzonspor and Trabzon Merkez Fen Lisesi signed a cooperation protocol covering science, technology and engineering: material and in-kind support for the FRC team, and a relationship meant to outlast a single season.',
				'It is why the team is called Trabzonspor Ro6one Robotics, and part of why a 21-team tournament could happen here. The robot is still ours to build.'
			],
			link: 'The relationship in detail'
		},
		contact: {
			label: 'Contact',
			title: 'Talk to us.',
			body: 'Companies, teachers, students, other teams, press. Two addresses, three channels, and no form that quietly goes nowhere.',
			link: 'Get in touch'
		}
	},

	about: {
		eyebrow: 'About',
		title: 'A team that had to build its own process before it could build a robot.',
		lede: 'RO6ONE Robotics — Trabzonspor Ro6one Robotics in full — is FRC team #11919, formed in February 2026 at Trabzon Merkez Fen Lisesi.',
		story: {
			title: 'The short version',
			body: [
				'In February 2026 a group of students at Trabzon Merkez Fen Lisesi decided to enter the FIRST Robotics Competition. Almost none of them had done it before. There was no previous build to learn from, no archive, no documented way of working — which meant the first engineering problem was the team, not the machine.',
				'With our mentor’s guidance the structure came together quickly: disciplines with clear ownership, an operations group to keep them aligned, and the habit of writing decisions down while the reasoning was still fresh.',
				'Five months later we had run a festival for four schools and organized a 21-team FRC Off-Season. We still have not competed in an official season. That is next, and it will be the first time this team is measured by a scoring table rather than by what it organized.'
			]
		},
		home: {
			title: 'Home',
			body: [
				'Trabzon Merkez Fen Lisesi is where the team was formed and where it still works. The school is not a backdrop: the student pool, the workshop and the first audience all came from the same corridors.',
				'The wider identity arrived in March 2026, when Trabzonspor and the school signed a cooperation protocol around science, technology and engineering. Since then the team competes as Trabzonspor Ro6one Robotics.'
			]
		},
		frc: {
			title: 'What FRC is, in context',
			body: [
				'FIRST Robotics Competition is an international high-school programme: teams receive a game and a limited build period, then compete at official events. The robot is roughly the size of a large appliance and has to survive being driven at speed into other robots.',
				'It is also a programme about everything around the robot — outreach, documentation, safety, communication, and sustaining a team beyond a single graduating class. That second half is where a rookie team can start immediately, and it is where we started.'
			]
		},
		principles: {
			title: 'How we work',
			items: [
				{
					name: 'Decide with evidence',
					description: 'Measure, prototype, then commit. Opinions are cheaper than machined parts.'
				},
				{
					name: 'Design for the person after you',
					description:
						'Label the wires. Name the file properly. Write the reason, not only the result.'
				},
				{
					name: 'Fail early, in cardboard',
					description:
						'The cheapest failure is the one that happens before the material gets expensive.'
				},
				{
					name: 'Own a domain, not a box',
					description:
						'A role describes what you are accountable for — not the only work you are allowed to touch.'
				},
				{
					name: 'Explain the work',
					description:
						'If we can’t explain a decision to someone outside the team, we don’t understand it yet.'
				}
			]
		},
		next: {
			title: 'What’s next',
			body: 'The first official season, the first competition robot, and a second edition of the work we started this year. Everything we build in between is meant to make the team that comes after us faster than we were.',
			cta: 'See how the team is organized'
		}
	},

	robotics: {
		eyebrow: 'Robotics',
		title: 'The machine, and everything that has to be true for it to work.',
		lede: 'Our first official competition robot is ahead of us. This is the structure it will be built inside.',
		status: {
			label: 'Build status',
			value: 'Pre-season',
			note: 'No official competition robot exists yet. This page will fill with real machines, not renders of imaginary ones.'
		},
		disciplines: {
			title: 'Who builds what',
			lede: 'Four disciplines with clear ownership and constant overlap.'
		},
		subsystems: {
			title: 'What a season robot is made of',
			lede: 'Every year the game changes and the mechanisms change with it. The layers underneath stay recognizable.',
			items: [
				{
					name: 'Drivetrain',
					description: 'Getting the mass where it needs to be, quickly, and stopping it there.'
				},
				{
					name: 'Manipulators',
					description: 'Whatever the game asks us to pick up, move, aim or place.'
				},
				{
					name: 'Power & control',
					description:
						'Battery, distribution, motor controllers, and wiring that can be traced under pressure.'
				},
				{
					name: 'Sensing & autonomy',
					description: 'Encoders, vision and state estimation — the robot knowing where it is.'
				},
				{
					name: 'Driver interface',
					description: 'The last milliseconds of the system: a human under competition stress.'
				}
			]
		},
		process: {
			title: 'How a build moves',
			lede: 'Roughly linear, honestly iterative.',
			steps: [
				{
					name: 'Read the game',
					description: 'Constraints, scoring, and the strategy the rules actually reward.'
				},
				{
					name: 'Concept & selection',
					description:
						'Many sketches, few survivors. Decisions get written down with their reasons.'
				},
				{
					name: 'CAD',
					description:
						'Full assembly before material is cut, so integration problems are found on screen.'
				},
				{
					name: 'Fabrication',
					description:
						'Cut, machine, print, assemble — and revise the drawing when reality disagrees.'
				},
				{
					name: 'Integration & testing',
					description: 'Subsystems become one robot, then get driven until something breaks.'
				},
				{
					name: 'Competition & retrospective',
					description:
						'Matches produce data. The retrospective turns it into next season’s starting point.'
				}
			]
		},
		archive: {
			title: 'Project index',
			lede: 'Robots, prototypes and internal tools, with their season and discipline.',
			meta: {
				season: 'Season',
				discipline: 'Discipline',
				status: 'Status'
			},
			status: {
				active: 'Active',
				prototype: 'Prototype',
				archived: 'Archived',
				planned: 'Planned'
			},
			empty: {
				title: 'Nothing here is invented',
				body: 'Entries appear as work gets documented, each with its season, discipline and status. An empty index is more useful than a fictional one.'
			}
		}
	},

	impact: {
		eyebrow: 'Impact',
		title: 'STEAM for STEM. STEM for People.',
		lede: 'Two principles, and the two projects we used to find out whether we meant them.',
		steam: {
			title: 'STEAM for STEM',
			body: 'Adding art, design and sport to STEM is not decoration. Drawing, filming, writing and presenting are how technical work becomes understandable — and how a student who came for something else ends up learning statics.'
		},
		people: {
			title: 'STEM for People',
			body: 'A robot that only impresses other robotics teams has a small audience. We want the work to be usable by people who will never walk into a pit: students choosing what to study, teachers looking for material, families curious about what happens in the workshop.'
		},
		focus: {
			title: 'Where we focus',
			lede: 'Four areas our outreach work is organized around.',
			items: [
				{
					name: 'Learning by building',
					description: 'Hands-on sessions where the output is a thing that moves, not a slide deck.'
				},
				{
					name: 'Open documentation',
					description: 'What we figure out gets written in a form another team can use.'
				},
				{
					name: 'Team to team',
					description:
						'The FRC ecosystem in Türkiye grows when teams mentor each other, not only when one team wins.'
				},
				{
					name: 'Regional reach',
					description:
						'Events, workshops and fields where they do not usually happen. Distance is an accessibility problem.'
				}
			]
		},
		record: {
			title: 'Programme record',
			body: 'Two projects so far, both documented on this page. Further workshops, visits and collaborations will be listed here as they happen, with dates and what was actually done — never as reach figures.'
		},
		collaborate: {
			title: 'Work with us',
			body: 'Schools, teachers, community groups and other teams: if there is something worth building together, we’d like to hear about it.',
			cta: 'Contact the team'
		}
	},

	team: {
		eyebrow: 'Team',
		title: 'Students run this. The structure is how.',
		lede: 'RO6ONE is organized as a network of responsibilities: clear ownership, deliberate overlap, and people who move to where the work is.',
		structure: {
			title: 'The network',
			lede: 'Seven domains inside one flexible pool. Select a domain to see what it owns.'
		},
		engineering: {
			title: 'Engineering disciplines',
			lede: 'Inside engineering, four disciplines share the machine.'
		},
		platform: {
			title: 'Engineering the organization',
			lede: 'The team runs on infrastructure the team maintains.'
		},
		roster: {
			title: 'Members',
			lede: 'Profiles are maintained per season.',
			empty: {
				title: 'Member profiles are being prepared',
				body: 'Names and portraits are published only with consent, so this section stays closed until that is in place. It renders from one content file and groups people by domain automatically.'
			}
		},
		join: {
			title: 'Joining the team',
			body: 'If you’re a student in Trabzon who wants to build things, write to us. Design, writing, filming, budgeting and organizing matter here as much as machining does — and most people end up doing more than one of them.',
			cta: 'Contact the team'
		}
	},

	partners: {
		eyebrow: 'Partners',
		title: 'Support turns a plan into a machine.',
		lede: 'One institutional relationship, one school, and room for the organizations that join next.',
		institutional: {
			title: 'Trabzonspor',
			body: [
				'In March 2026, Trabzonspor and Trabzon Merkez Fen Lisesi signed a cooperation protocol in science, technology and engineering. It commits the club to supporting the FRC team with material and in-kind contributions through national and international competitions, and frames the relationship as a lasting one rather than a single sponsorship.',
				'For a team formed a month earlier, that protocol changed what was possible. It is why we compete as Trabzonspor Ro6one Robotics, and part of why an FRC Off-Season could be held in Trabzon in July.'
			],
			schoolTitle: 'Trabzon Merkez Fen Lisesi',
			schoolBody:
				'The school the team was formed in and still works from: the workshop, the student pool, and the first audience for everything we build.',
			since: 'Protocol signed'
		},
		why: {
			title: 'What a partnership means here',
			body: [
				'A season needs materials, machine time, tools, electronics, transport and a budget. Most of that is not something a school team can generate on its own.',
				'In return, a partner gets a group of students who document what they do, credit their sources and can explain the engineering — plus visibility with an audience that takes technical work seriously.'
			]
		},
		support: {
			title: 'Ways to support',
			items: [
				{
					name: 'Materials',
					description: 'Aluminium, polycarbonate, fasteners, filament, raw stock.'
				},
				{
					name: 'Machining & fabrication',
					description: 'Access to CNC, lathe, waterjet or welding time.'
				},
				{
					name: 'Tools & electronics',
					description: 'Hand tools, measurement equipment, motors, sensors, batteries.'
				},
				{
					name: 'Logistics',
					description: 'Transport, shipping, accommodation and event travel.'
				},
				{
					name: 'Mentorship',
					description: 'An engineer’s afternoon is sometimes worth more than a purchase order.'
				},
				{
					name: 'Funding',
					description: 'Registration, event fees, and the parts nobody donates.'
				}
			]
		},
		current: {
			title: 'Supporters',
			lede: 'Organizations supporting the current season.',
			empty: {
				title: 'This list is published, not padded',
				body: 'Names appear here once a partnership is confirmed and the organization is happy to be named. Conversations in progress stay private until then.'
			}
		},
		pack: {
			title: 'Partnership document',
			body: 'A downloadable partnership document is being prepared. Until it is finished, write to us and we will send the current version.'
		},
		cta: {
			title: 'Start a conversation',
			body: 'Tell us what you can offer and we’ll tell you exactly where it goes.',
			action: 'Partnership enquiries'
		}
	},

	contact: {
		eyebrow: 'Contact',
		title: 'Get in touch.',
		lede: 'Two addresses and three channels, all of them real.',
		reasons: {
			title: 'Who writes to us',
			items: [
				{
					name: 'Companies & sponsors',
					description: 'Materials, machine time, mentorship, funding.'
				},
				{
					name: 'Schools & teachers',
					description: 'Workshops, visits and classroom collaboration.'
				},
				{
					name: 'Students',
					description: 'Joining the team, or asking how something was built.'
				},
				{
					name: 'Other teams',
					description: 'Mentorship, spare parts, scouting data, questions.'
				}
			]
		},
		channels: {
			title: 'Direct',
			generalLabel: 'General',
			generalNote: 'Questions, collaboration, press, anything else.',
			sponsorshipLabel: 'Partnerships',
			sponsorshipNote: 'Sponsorship, material support, institutional contact.',
			locationLabel: 'Based in',
			socialLabel: 'Channels',
			copy: 'Copy address',
			copied: 'Copied'
		},
		form: {
			title: 'Write a message',
			note: 'This form composes a draft in your own mail app. Nothing is sent from this page and nothing is stored.',
			name: 'Your name',
			email: 'Your email',
			subject: 'Subject',
			topicLabel: 'Goes to',
			message: 'Message',
			submit: 'Open in mail app',
			optional: 'Optional'
		}
	},

	footer: {
		explore: 'Explore',
		connect: 'Connect',
		identity: 'Identity',
		homeLabel: 'Home',
		rights: 'All rights reserved.',
		first:
			'FIRST®, FIRST® Robotics Competition and FRC® are trademarks of FIRST®, which does not sponsor, support or endorse this site.'
	},

	error: {
		notFound: {
			title: 'This page doesn’t exist.',
			body: 'The address may be mistyped, or the page hasn’t been built yet.'
		},
		generic: {
			title: 'Something went wrong.',
			body: 'The page couldn’t be loaded. Trying again usually helps.'
		},
		cta: 'Back to home'
	},

	seo: {
		home: {
			title: 'Trabzonspor Ro6one Robotics — FRC Team #11919',
			description:
				'FRC team #11919 from Trabzon, Türkiye. Formed in February 2026 at Trabzon Merkez Fen Lisesi: Spor STEAM Fest ’26, the first FRC Off-Season in the Black Sea Region, and a first official season ahead.'
		},
		about: {
			title: 'About',
			description:
				'How Trabzonspor Ro6one Robotics was formed in February 2026, its home at Trabzon Merkez Fen Lisesi, the Trabzonspor cooperation protocol, and how the team works.'
		},
		robotics: {
			title: 'Robotics',
			description:
				'Disciplines, subsystems and the build process behind FRC team #11919’s first official competition robot.'
		},
		impact: {
			title: 'Impact',
			description:
				'Spor STEAM Fest ’26 and the Trabzon Off-Season: how RO6ONE brings FRC and STEAM to the Eastern Black Sea.'
		},
		team: {
			title: 'Team',
			description:
				'The network of responsibilities behind RO6ONE: engineering, operations, media, PR, creative, sponsorship and finance — plus Ekip Ro6one, the platform the team runs itself.'
		},
		partners: {
			title: 'Partners',
			description:
				'The Trabzonspor cooperation protocol, Trabzon Merkez Fen Lisesi, and how organizations can support FRC team #11919.'
		},
		contact: {
			title: 'Contact',
			description:
				'Reach Trabzonspor Ro6one Robotics — iletisim@ro6one.com for general enquiries, sponsorluk@ro6one.com for partnerships.'
		}
	}
};

export type Dictionary = typeof en;
