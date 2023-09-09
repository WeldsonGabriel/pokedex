$(document).ready(function() {
    $('#fetchPokemon').click(function() {
        const pokeId = $('#pokeId').val();
        if (pokeId) {
            fetchPokemon(pokeId);
        } else {
            alert('Please enter a valid Pokemon ID');
        }
    });
});

function fetchPokemon(id) {
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon-form/${id}/`,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // Use the most updated sprite
            $('#pokeImage').attr('src', data.sprites.front_default);
            $('#pokeName').text(data.name);
            
            // Since we're using a different endpoint, we'll need to adjust the type-fetching method.
            // For simplicity, let's retrieve the type using the original pokemon endpoint.
            fetchPokemonType(id);
        },
        error: function(error) {
            alert('Failed to fetch Pokemon. Please try again.');
        }
    });
}

function fetchPokemonType(id) {
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            let types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
            $('#pokeType').text(`Type: ${types}`);
            // Set the gradient based on the primary type of the Pokemon
            $('body').attr('data-bg-type', data.types[0].type.name);
        },
        error: function(error) {
            alert('Failed to fetch Pokemon type. Please try again.');
        }
    });
}
