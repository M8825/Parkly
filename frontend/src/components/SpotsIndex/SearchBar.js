const SearchBar = ({
	handleCarTypeChange,
	handleSearchBarChange,
	address,
	handleSearchSubmit,
}) => {
	return (
		<div className="search-bar" style={{ minWidth: "500px !important"}}>
			<div className="input-group mb-3">
				<button
					type="button"
					className="btn btn-secondary dropdown-toggle dropdown-toggle-split car-type-pricing"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					Car Type{" "}
					<span className="visually-hidden">Toggle Dropdown</span>
				</button>
				<ul className="dropdown-menu" onChange={handleCarTypeChange}>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value="Sedan"
							id="defaultCheck1"
						/>
						<label
							className="form-check-label"
							htmlFor="defaultCheck1"
						>
							Sedan
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value="Truck"
							id="defaultCheck1"
						/>
						<label
							className="form-check-label"
							htmlFor="defaultCheck1"
						>
							Truck
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value="Minivan"
							id="defaultCheck1"
						/>
						<label
							className="form-check-label"
							htmlFor="defaultCheck1"
						>
							Minivan
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value="Compact"
							id="defaultCheck1"
						/>
						<label
							className="form-check-label"
							htmlFor="defaultCheck1"
						>
							Compact
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value="SUV"
							id="defaultCheck1"
						/>
						<label
							className="form-check-label"
							htmlFor="defaultCheck1"
						>
							SUV
						</label>
					</div>
				</ul>
				<button
					type="button"
					className="btn btn-secondary dropdown-toggle dropdown-toggle-split car-type-pricing"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					Pricing{" "}
					<span className="visually-hidden">Toggle Dropdown</span>
				</button>
				<ul className="dropdown-menu">
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value=""
							id="defaultCheck1"
						/>
						<label
							className="form-check-label"
							htmlFor="defaultCheck1"
						>
							$
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value=""
							id="defaultCheck1"
						/>
						<label
							className="form-check-label"
							htmlFor="defaultCheck1"
						>
							$$
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value=""
							id="defaultCheck1"
						/>
						<label
							className="form-check-label"
							htmlFor="defaultCheck1"
						>
							$$$
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value=""
							id="defaultCheck1"
						/>
						<label
							className="form-check-label"
							htmlFor="defaultCheck1"
						>
							$$$$
						</label>
					</div>
				</ul>

				<input
					type="text"
					className="form-control"
					aria-label="Text input with segmented dropdown button"
					onChange={handleSearchBarChange}
					value={address}
				/>

				<button
					className="btn btn-outline-secondary car-type-pricing"
					type="button"
					onClick={handleSearchSubmit}
				>
					Search
				</button>
			</div>
		</div>
	);
};

export default SearchBar;
