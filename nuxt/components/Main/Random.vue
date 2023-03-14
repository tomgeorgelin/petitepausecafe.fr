<template>
	<section class="my-10 w-[95%] md:w-[70%] mx-auto flex flex-col gap-5">
		<div class="flex flex-row justify-between items-baseline">
			<div class="text-xl font-semibold" id="random">
				Article au hasard
			</div>
			<a href="#todo" class="text-xs text-gray-500 hover:underline"
				>Tout voir</a
			>
		</div>
		<div
			class="flex flex-col gap-0 md:flex-row md:h-[300px] shadow-lg rounded-lg"
		>
			<div class="md:w-1/2 h-[300px]">
				<div class="h-full">
					<div
						class="rounded-l-lg px-5 w-full h-full flex flex-col justify-around bg-white"
					>
						<p class="text-xs text-gray-600 leading-6">
							PAR
							<a
								href="#author"
								class="hover:underline decoration-[#FF5480]"
								>TOM GEORGELIN</a
							>
							DANS
							<a
								href="#category"
								class="hover:underline decoration-[#FF5480]"
								>DÉVELOPPEMENT</a
							>
						</p>
						<p class="text-2xl leading-10">
							Comment créer un site web marchant en utilisant des
							solutions innovante
						</p>
						<p class="text-xs text-gray-500 leading-6">
							Vous vous êtes déjà demandé comment créer un site
							web marchant de A à Z ? Dans cet article nous allons
							vous expliquer comment créer votre premier site
							marchant !
						</p>
					</div>
				</div>
			</div>
			<div class="md:w-1/2 h-[300px]">
				<img
					class="overflow-hidden object-cover object-center w-full h-full rounded-r-lg"
					src="https://s3.amazonaws.com/designco-web-assets/uploads/2017/06/designbetter_website_book_assets_illustrations_designleadershiphandbook_cover.png"
					alt=""
				/>
			</div>
		</div>
	</section>
</template>
