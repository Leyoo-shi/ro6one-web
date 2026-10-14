<script lang="ts">
	import ContactCta from '$lib/components/sections/ContactCta.svelte';
	import DailySignal from '$lib/components/sections/DailySignal.svelte';
	import Disciplines from '$lib/components/sections/Disciplines.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import Institutional from '$lib/components/sections/Institutional.svelte';
	import MemberStream from '$lib/components/sections/MemberStream.svelte';
	import OffSeason from '$lib/components/sections/OffSeason.svelte';
	import Origin from '$lib/components/sections/Origin.svelte';
	import Principles from '$lib/components/sections/Principles.svelte';
	import SteamFest from '$lib/components/sections/SteamFest.svelte';
	import SystemChapter from '$lib/components/sections/SystemChapter.svelte';
	import Monolith11919 from '$lib/components/ui/Monolith11919.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import { useI18n } from '$lib/i18n/context.svelte';

	let { data } = $props();

	const i18n = useI18n();
</script>

<Seo title={i18n.t.seo.home.title} description={i18n.t.seo.home.description} exactTitle />

<!--
	The homepage in order:

	  hero            the material, and the claim
	  today           whoever has a birthday, or one line from the record
	  01 people       seventy students, moving
	  02 origin       February 2026 and the four months after it
	  03–04 events    STEAMFest, then the Off-Season at a larger scale
	  05 #11919       the hinge: history above, system below
	  06–07 build     the machine, then the organization
	  08–10 close     principles, Trabzonspor, contact

	The people come before the projects on purpose: a robotics team is the
	students, and the rest of the page is what they did.
-->
<Hero />

<DailySignal today={data.today} />

<MemberStream />

<Origin />
<SteamFest />
<OffSeason />

<Monolith11919 />

<Disciplines />
<SystemChapter />
<Principles />
<Institutional />
<ContactCta />
