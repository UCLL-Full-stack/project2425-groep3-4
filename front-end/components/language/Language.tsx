import Select from 'react-select';
import { useRouter } from 'next/router';

const Language: React.FC = () => {
    const router = useRouter();
    const { locale } = router;

    const options = [
        {
            value: 'nl',
            label: (
                <span>
                    <img
                        src="/images/nl.svg"
                        alt="Nederlands"
                        style={{ width: '16px', marginRight: '8px' }}
                    />
                    NL
                </span>
            ),
        },
        {
            value: 'en',
            label: (
                <span>
                    <img
                        src="/images/en.svg"
                        alt="English"
                        style={{ width: '16px', marginRight: '8px' }}
                    />
                    EN
                </span>
            ),
        },
        {
            value: 'es',
            label: (
                <span>
                    <img
                        src="/images/es.svg"
                        alt="Español"
                        style={{ width: '16px', marginRight: '8px' }}
                    />
                    ES
                </span>
            ),
        },
    ];

    const handleLanguageChange = (selectedOption: any) => {
        if (selectedOption && selectedOption.value) {
            router.push(
                {
                    pathname: router.pathname,
                    query: router.query,
                },
                router.asPath,
                { locale: selectedOption.value }
            );
        }
    };

    return (
        <div className="d-flex align-items-center">
            <label htmlFor="language" className="text-white me-2 fs-5">
                Language:
            </label>
            <Select
                id="language-select"
                instanceId="language-select"
                options={options}
                defaultValue={options.find((option) => option.value === locale)}
                onChange={handleLanguageChange}
                className="fs-5 bg-dark border-0"
            />
        </div>
    );
};

export default Language;
