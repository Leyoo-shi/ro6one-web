/**
 * English is the source dictionary: its shape defines the `Dictionary` type,
 * so every other locale is checked against it at compile time.
 *
 * Rules for editing:
 *  - Keep keys structural (`about.principles.items`), never sentence-shaped.
 *  - Copy must not assert facts the team has not confirmed (awards, numbers,
 *    partners, past events). Describe approach and intent instead.
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
		backToTop: 'Back to top'
	},

	nav: {
		about: 'About',
		robotics: 'Robotics',
		impact: 'Impact',
		team: 'Team',
		partners: 'Partners',
		contact: 'Contact'
	},

	hero: {
		eyebrow: 'FRC Team #11919',
		titleTop: 'Build what',
		titleBottom: 'comes next.',
		description: 'We design, build and compete — but the work continues beyond a single season.',
		meta: {
			season: 'Season',
			team: 'Team'
		},
		scroll: 'Scroll to explore'
	},

	departments: {
		mechanical: {
			name: 'Mechanical',
			description:
				'Structure, drivetrain and mechanisms: from concept sketch to a part that survives a match.'
		},
		design: {
			name: 'CAD & Design',
			description:
				'Full-assembly CAD, tolerance decisions, and the drawings the workshop actually builds from.'
		},
		software: {
			name: 'Software',
			description:
				'Robot control, sensing and driver tooling — plus the internal tools the team runs on.'
		},
		electrical: {
			name: 'Electrical',
			description:
				'Power distribution, wiring discipline, sensors, and finding the fault before the next match.'
		},
		media: {
			name: 'Media & Communication',
			description:
				'Photography, video, identity and documentation: how the work becomes legible to other people.'
		},
		operations: {
			name: 'Operations',
			description:
				'Planning, logistics, partnerships and the budget that turns a plan into a build.'
		}
	},

	home: {
		identity: {
			label: 'Who we are',
			title: 'A robotics team that works like an engineering organization.',
			body: [
				'RO6ONE is a FIRST Robotics Competition team based in Trabzon. Every season we design and build a competition robot — and alongside it, the systems, documentation and habits that make the next build better than the last.',
				'Sketch, review, prototype, measure, fail, revise. The robot is the visible result. The process is the thing we are actually building.'
			],
			principles: [
				{
					term: 'STEAM for STEM',
					gloss:
						'Design, communication and craft are engineering instruments — not decoration applied at the end.'
				},
				{
					term: 'STEM for People',
					gloss: 'Technology is only finished when it reaches someone outside the workshop.'
				}
			]
		},
		disciplines: {
			label: 'How we build',
			title: 'One machine, six disciplines that have to agree.',
			lede: 'A season is an integration problem before it is a mechanical one. These are the groups that have to converge.'
		},
		continuity: {
			label: 'Beyond the season',
			title: 'A season ends. The work doesn’t.',
			body: 'Between competitions we prototype, rebuild our tooling, write down what we learned, and train the people who will run the next build. Continuity isn’t luck — it’s a design decision.',
			items: [
				{
					name: 'Prototyping',
					description: 'Ideas tested cheaply, long before they become a season commitment.'
				},
				{
					name: 'Documentation',
					description: 'Decisions written down while the reasoning is still fresh.'
				},
				{
					name: 'Handover',
					description: 'Every role has a successor who learned it before they needed it.'
				}
			]
		},
		impact: {
			label: 'Impact',
			title: 'Engineering that leaves the workshop.',
			body: '“STEAM for STEM” and “STEM for People” are not slogans on a wall. They describe where we want the work to end up: in classrooms, in other teams’ pit areas, in the hands of people who did not build it.',
			link: 'Our approach to impact'
		},
		team: {
			label: 'The team',
			title: 'A team is an organization.',
			body: 'Departments, handoffs, reviews, mentorship. Students run the work; the structure is what makes that possible.',
			link: 'See how we’re organized'
		},
		partners: {
			label: 'Partners',
			title: 'Seasons are made possible by people outside the team.',
			body: 'Materials, machine time, tooling, transport, mentorship, funding. If you want to support engineering education in Trabzon, there is a concrete way to do it.',
			link: 'Ways to support'
		},
		contact: {
			label: 'Contact',
			title: 'Talk to us.',
			body: 'Whether you want to support the team, build something together, or just ask how we did one specific thing.',
			link: 'Get in touch'
		}
	},

	about: {
		eyebrow: 'About',
		title: 'We build a robot every season, and an organization the whole time.',
		lede: 'RO6ONE Robotics is FRC Team #11919, based in Trabzon, Türkiye. This page explains how we think about the work.',
		story: {
			title: 'The short version',
			body: [
				'A FIRST Robotics Competition season gives a team a few intense weeks: a new game, a new set of constraints, and a machine that has to exist by a deadline. It is an engineering problem with a hard schedule attached.',
				'We treat that deadline as a forcing function rather than the point. The robot is what a season produces; what we keep is the method — how decisions get made, how parts get documented, how someone new becomes useful in two weeks instead of two months.',
				'That is also why this site exists. Work that isn’t written down is work that has to be rediscovered.'
			]
		},
		frc: {
			title: 'What FRC is, in context',
			body: [
				'FIRST Robotics Competition is an international high-school programme: teams receive a game and a limited build period, then compete at regional events. The robot is roughly the size of a large appliance and has to survive being driven at speed into other robots.',
				'It is also a programme about everything around the robot — outreach, documentation, safety, communication, and sustaining a team beyond a single graduating class.'
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
					name: 'Finish, then refine',
					description:
						'On match day a working subsystem beats an elegant unfinished one, every time.'
				},
				{
					name: 'Explain the work',
					description:
						'If we can’t explain a design decision to someone outside the team, we don’t understand it yet.'
				}
			]
		},
		organisation: {
			title: 'Structure',
			body: 'The team is organized into disciplines that each own part of the build, with shared reviews where they meet. Roles are handed over deliberately, so knowledge doesn’t leave when a student graduates.',
			cta: 'See the departments'
		}
	},

	robotics: {
		eyebrow: 'Robotics',
		title: 'The machine, and everything that has to be true for it to work.',
		lede: 'Competition robots, prototypes, software, and the tooling around them.',
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
				title: 'Documentation in progress',
				body: 'Project entries are written from build notes. This index reads from a single content file and fills in as entries are added.'
			}
		}
	},

	impact: {
		eyebrow: 'Impact',
		title: 'STEAM for STEM. STEM for People.',
		lede: 'Two phrases we use to stay honest about who engineering is for.',
		steam: {
			title: 'STEAM for STEM',
			body: 'Adding art and design to STEM isn’t decoration. Drawing, writing, filming and presenting are how technical work becomes understandable — and how a student who came for design ends up learning statics.'
		},
		people: {
			title: 'STEM for People',
			body: 'A robot that only impresses other robotics teams has a small audience. We want the work to be usable by people who will never walk into a pit: students choosing what to study, teachers looking for material, neighbours curious about what happens in the workshop.'
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
					name: 'Responsible making',
					description:
						'Material reuse, repairability, and an honest account of what a build actually costs.'
				}
			]
		},
		record: {
			title: 'Programme record',
			body: 'Individual workshops, visits and collaborations will be listed here as they are documented, with dates and what was actually done.'
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
		lede: 'RO6ONE is organized into disciplines with clear ownership and deliberate overlap.',
		structure: {
			title: 'Departments',
			lede: 'Each department owns part of the build and is accountable at shared reviews.'
		},
		roster: {
			title: 'Members',
			lede: 'Profiles are maintained per season.',
			empty: {
				title: 'Member profiles are being prepared',
				body: 'This section renders from one content file. Once names, roles and photos are added, cards appear here grouped by department.'
			}
		},
		join: {
			title: 'Joining the team',
			body: 'If you’re a student in Trabzon who wants to build things, get in touch. Design, writing, filming, budgeting and organizing matter here as much as machining does.',
			cta: 'Contact the team'
		}
	},

	partners: {
		eyebrow: 'Partners',
		title: 'Support turns a plan into a machine.',
		lede: 'Partnership in FRC is closer to industrial collaboration than to advertising.',
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
			title: 'Current partners',
			lede: 'Organizations supporting the current season.',
			empty: {
				title: 'This list is maintained by the team',
				body: 'Partner names, logos and descriptions come from one content file. Nothing appears here until a partnership is confirmed.'
			}
		},
		pack: {
			title: 'Sponsorship document',
			body: 'A downloadable partnership document will be linked here once it is finished.'
		},
		cta: {
			title: 'Start a conversation',
			body: 'Tell us what you can offer and we’ll tell you exactly where it goes.',
			action: 'Contact us'
		}
	},

	contact: {
		eyebrow: 'Contact',
		title: 'Get in touch.',
		lede: 'The direct ways to reach the team.',
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
			emailLabel: 'Email',
			emailPending: 'A public address will be published here.',
			locationLabel: 'Based in',
			socialLabel: 'Elsewhere',
			socialPending: 'Official accounts will be linked here once they are confirmed.'
		},
		form: {
			title: 'Write a message',
			note: 'This form composes a message in your own mail app. Nothing is sent from this page and nothing is stored.',
			name: 'Your name',
			email: 'Your email',
			subject: 'Subject',
			message: 'Message',
			submit: 'Open in mail app',
			unavailable:
				'A contact address hasn’t been published yet, so this form is inactive. It activates as soon as one is added.',
			optional: 'Optional'
		}
	},

	footer: {
		explore: 'Explore',
		connect: 'Connect',
		identity: 'Identity',
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
			title: 'RO6ONE Robotics — FRC Team #11919',
			description:
				'RO6ONE Robotics is FIRST Robotics Competition team #11919 from Trabzon, Türkiye. We design, build and compete — and the work continues beyond a single season.'
		},
		about: {
			title: 'About',
			description:
				'How RO6ONE Robotics, FRC Team #11919 from Trabzon, approaches engineering, documentation and continuity between seasons.'
		},
		robotics: {
			title: 'Robotics',
			description:
				'Competition robots, prototypes, software and tooling: how a RO6ONE build moves from reading the game to the post-season retrospective.'
		},
		impact: {
			title: 'Impact',
			description:
				'STEAM for STEM, STEM for People — how RO6ONE Robotics thinks about outreach, open documentation and engineering that leaves the workshop.'
		},
		team: {
			title: 'Team',
			description:
				'The departments that make up RO6ONE Robotics: mechanical, CAD and design, software, electrical, media and operations.'
		},
		partners: {
			title: 'Partners',
			description:
				'Ways to support FRC Team #11919 in Trabzon: materials, machining, tools, logistics, mentorship and funding.'
		},
		contact: {
			title: 'Contact',
			description:
				'Reach RO6ONE Robotics, FRC Team #11919 in Trabzon, Türkiye — for sponsorship, collaboration, workshops or joining the team.'
		}
	}
};

export type Dictionary = typeof en;
