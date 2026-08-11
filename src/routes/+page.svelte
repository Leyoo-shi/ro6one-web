<script lang="ts">
	import ContactCta from '$lib/components/sections/ContactCta.svelte';
	import Continuity from '$lib/components/sections/Continuity.svelte';
	import Disciplines from '$lib/components/sections/Disciplines.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import Identity from '$lib/components/sections/Identity.svelte';
	import ImpactPreview from '$lib/components/sections/ImpactPreview.svelte';
	import PartnersPreview from '$lib/components/sections/PartnersPreview.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
</script>

<Seo title={i18n.t.seo.home.title} description={i18n.t.seo.home.description} exactTitle />

<Hero />
<Identity />
<Disciplines />
<Continuity />
<ImpactPreview />
<PartnersPreview />
<ContactCta />
