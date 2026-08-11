<script lang="ts">
	import ContactCta from '$lib/components/sections/ContactCta.svelte';
	import Disciplines from '$lib/components/sections/Disciplines.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import Institutional from '$lib/components/sections/Institutional.svelte';
	import OffSeason from '$lib/components/sections/OffSeason.svelte';
	import Origin from '$lib/components/sections/Origin.svelte';
	import Principles from '$lib/components/sections/Principles.svelte';
	import SteamFest from '$lib/components/sections/SteamFest.svelte';
	import SystemChapter from '$lib/components/sections/SystemChapter.svelte';
	import Monolith11919 from '$lib/components/ui/Monolith11919.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
</script>

<Seo title={i18n.t.seo.home.title} description={i18n.t.seo.home.description} exactTitle />

<!--
	The homepage is one story told in order:
	who we are → what we did → who that made us → what we build → how we work.

	The 11919 band is the hinge: everything above it is history, everything
	below it is system. It is also the point where the page changes material.
-->
<Hero />

<Origin />
<SteamFest />
<OffSeason />

<Monolith11919 />

<Disciplines />
<SystemChapter />
<Principles />
<Institutional />
<ContactCta />
