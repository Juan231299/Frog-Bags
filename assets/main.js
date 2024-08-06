const API = 'https://instagram-scraper-api2.p.rapidapi.com/v1.2/posts?username_or_id_or_url=67791296641';

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '36d869d0camshec99646942b7833p144224jsna35e94584c1e',
        'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
    }
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

document.addEventListener('DOMContentLoaded', async () => {
    const content = document.getElementById('content');
    
    if (!content) {
        console.error('Elemento con el ID "content" no encontrado.');
        return;
    }

    try {
        const result = await fetchData(API);

        const itemsToShow = result.data.items.slice(0, 4);

        let view = itemsToShow.map(item => {

            const isReel = item.is_video;

            if (isReel) {
                return `
                <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <video src="${item.video_url}" alt="${item.caption ? item.caption.text : 'No caption'}" class="w-full" controls></video>
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${item.caption ? item.caption.text : 'No caption'}
                    </h3>
                </div>
                </div>
                `;
            } else {
                return `
                <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${item.thumbnail_url}" alt="${item.caption ? item.caption.text : 'No caption'}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${item.caption ? item.caption.text : 'No caption'}
                    </h3>
                </div>
                </div>
                `;
            }
        }).join('');

        content.innerHTML = view;
    } catch (error) {
        console.error(error);
    }
});
