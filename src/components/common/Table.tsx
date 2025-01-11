import React, { useState, useMemo } from 'react';
import { Table, InputGroup, Form } from 'react-bootstrap';
import Select from 'react-select';
import Lightbox from 'yet-another-react-lightbox';

interface Column {
    key: string; // Key for data field
    label: string; // Display label for column header
    filterable?: boolean; // Determines if this column can be filtered
    render?: (row: any, onClick: () => void) => React.ReactNode; // Custom render function for column data
}

interface GenericTableProps {
    data: any[]; // Dynamic table data
    columns: Column[]; // Column configuration
    loading?: boolean; // Loading state
}

const GenericTable: React.FC<GenericTableProps> = ({ data, columns, loading = false }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<{ key: string; value: any } | null>(null);
    const [lightboxOpen, setLightboxOpen] = useState(false); // State for lightbox visibility
    const [lightboxImage, setLightboxImage] = useState<string>(''); // State for lightbox image

    // Filtered and searched data
    const filteredData = useMemo(() => {
        return data
            ?.filter(item => {
                if (selectedFilter) {
                    return String(item[selectedFilter.key]).toLowerCase() === String(selectedFilter.value).toLowerCase();
                }
                return true;
            })
            .filter(item => {
                if (searchQuery) {
                    return Object.values(item).some(value =>
                        String(value).toLowerCase().includes(searchQuery.toLowerCase())
                    );
                }
                return true;
            });
    }, [data, searchQuery, selectedFilter]);

    // Generate filter options dynamically from the columns marked as filterable
    const filterOptions = useMemo(() => {
        if (!columns) return [];
        return columns
            .filter(column => column.filterable)
            .map(column => ({
                label: column.label,
                key: column.key,
                options: Array.from(new Set(data.map(item => item[column.key])))
                    .filter(value => value !== null && value !== undefined)
                    .map(value => ({ label: String(value), value })),
            }));
    }, [columns, data]);

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
                {/* Search Input */}
                <InputGroup className="w-50">
                    <Form.Control
                        placeholder="Search..."
                        aria-label="Search"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </InputGroup>

                {/* Filter Dropdown */}
                {filterOptions.map(filter => (
                    <Select
                        key={filter.key}
                        options={[{ label: `All Filter`, value: null }, ...filter.options]}
                        placeholder={`Filter by ${filter.label}`}
                        className="w-25"
                        onChange={selected =>
                            setSelectedFilter(selected?.value ? { key: filter.key, value: selected.value } : null)
                        }
                    />
                ))}
            </div>

            {/* Table */}
            <Table responsive hover className="cp-table">
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th key={column.key}>{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center">
                                Loading...
                            </td>
                        </tr>
                    ) : filteredData?.length ? (
                        filteredData.map((row, index) => (
                            <tr key={index}>
                                {columns.map(column => (
                                    <td key={column.key}>
                                        {column.render ? column.render(row, () => {
                                            setLightboxImage(row.image||row.imageUrl); // Set image for lightbox
                                            setLightboxOpen(true); // Open the lightbox
                                        }) : row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="text-center">
                                No results found
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Lightbox for Image */}
            {lightboxOpen && (
                <Lightbox
                    open={lightboxOpen}
                    close={() => setLightboxOpen(false)} // Close the lightbox
                    slides={[{ src: lightboxImage }]} // Single image
                    carousel={{
                        finite: true,
                        imageProps: {
                            style: { maxWidth: '500px', maxHeight: '500px', objectFit: 'contain' } // Adjust size here
                        }

                    }}
                />
            )}



        </div>
    );
};

export default GenericTable;
