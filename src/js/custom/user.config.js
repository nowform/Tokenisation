export const user = {
    'name': 'Subahlakshmi Chandra',
    'phone': '9988776655',
    'cards': [
        {
            'card_number': ['8810', '6327', '9900', '6754'],
            'name_on_card': 'Subahlakshmi Chandra',
            'validity': {
                'month': 12,
                'year': 24
            },
            'wallet_limits': {
                'international': {
                    'current_limit': '1,75,000',
                    'utilized': '50,000',
                    'status': {
                        'all': false,
                        'atm': false
                    }
                },
                'online': {
                    'current_limit': '2,000',
                    'utilized': '50,000',
                    'status': {
                        'all': false,
                        'domestic': false,
                        'international': false
                    }
                },
                'contactless': {
                    'non_pin': {
                        'current_limit': '2,50,000',
                        'new_limit': '2,50,000',
                        'old_count': 5,
                        'new_count': 3,
                        'status': true
                    },
                    'pin': {
                        'current_limit': '2,50,000',
                        'new_limit': '2,50,000',
                        'old_count': 5,
                        'new_count': 3,
                        'status': true
                    }
                }
            }
        }
    ]
}